import Task from "./Task";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { getLoggedIn } from "../../../../context/loggedInState";
import { get, post } from "../../../../tools/request";
import AddTask from "../Tasking/AddTask";
import {
    useAddTask,
    useAddTaskUpdate,
} from "../../../../context/AddTaskContext";
import { FaRegCalendarCheck, FaRegObjectUngroup } from "react-icons/fa";
import {
    useToDoContext,
    useUpdateToDoContext,
} from "../../../../context/ToDoContext";
import { useCounter, useCounterUpdate} from "../../../../context/ToDoContext";
import EmptyState from "../../../layout/EmptyState";
import { useSettingsContext } from "../../../../context/SettingsContext";
import { getDateUTC, getDayString, getTodayUTC } from "../../../../tools/time";

const Tasks = ({view}) => {
    const settings = useSettingsContext();

    const [tasks, setTasks] = useState(null);
    const [hover, setHover] = useState(false);
    const [vw, setVw] = useState(view);
    const loggedIn = getLoggedIn();
    const showAddTask = useAddTask();
    const toggleAddTask = useAddTaskUpdate();
    const toDoContext = useToDoContext();
    const setToDoContext = useUpdateToDoContext();
    const counter = useCounter();
    const counterUpdate = useCounterUpdate();

    useEffect(() => {
        // Fetch task items
        setVw(view);
        if (loggedIn === true && toDoContext.reloadTasks === true) {
            if (toDoContext.currentTeam === "") {
                get("/api/task/getTasks").then((resJson) => {
                    if (resJson.tasks !== undefined) {
                        setTasks(resJson.tasks);
                        setToDoContext({
                            ...toDoContext,
                            reloadTasks: false,
                            teamUsers: [],
                        });
                    }
                });
            } else {
                setToDoContext({ ...toDoContext, reloadTasks: false });
                post("/api/task/getTeamTasks", { team: toDoContext.currentTeam }).then(
                    (resJson) => {
                        if (resJson.tasks !== undefined) {
                            setTasks(resJson.tasks);
                            setToDoContext({ ...toDoContext, reloadTasks: false });
                        }
                    }
                );
                post("/api/teams/getTeamsUsers", {
                    team: toDoContext.currentTeam,
                }).then((res) => {
                    if (res.users != undefined) {
                        setToDoContext({
                            ...toDoContext,
                            teamUsers: insertionSortString(res.users),
                        });
                    } else {
                        setToDoContext({ ...toDoContext, teamUsers: [] });
                    }
                });
            }
        } else {
            return <Redirect to="/login" />;
        }
    }, [toDoContext, tasks, loggedIn, view]);

    const handleHover = () => {
        setHover(!hover);
    };

    function checkBucketsSelected(buckets) {
        for (const taskBucket of buckets) {
            for (const bucket of toDoContext.currentBucket) {
                if (bucket.id === taskBucket) return true;
            }
        }
        return false;
    }

    // function setReload(reload) {
    //     setToDoContext({...toDoContext, reloadTasks: reload})
    // }

    function insertionSortString(inputArrString) {
        let n = inputArrString.length;
        // As long as our i is less than inputArr increment i
        for (let i = 1; i < n; i++) {
            let current = inputArrString[i]; // Store the current item
            // Create a loop to look at previous items. If they are greater we need to shift/copy them to the right.
            let j = i - 1; // Starting at the previous item before i
            while (j >= 0 && current.localeCompare(inputArrString[j]) < 0) {
                inputArrString[j + 1] = inputArrString[j]; // Shift the item to the right if both conditions are met
                j--; // Decrement j to close the loop
            }
            inputArrString[j + 1] = current;
        }
        return inputArrString;
    }

    function insertionSortTasksDueDate(inputArr) {
        let n = inputArr.length;
        // As long as our i is less than inputArr increment i
        for (let i = 1; i < n; i++) {
            let current = inputArr[i]; // Store the current item
            console.log("This is current: ");
            console.log(current);
            // Create a loop to look at previous items. If they are greater we need to shift/copy them to the right.
            let j = i - 1; // Starting at the previous item before i
            while (j >= 0 && inputArr[j].duedate < current.duedate) {
                inputArr[j + 1] = inputArr[j]; // Shift the item to the right if both conditions are met
                j--; // Decrement j to close the loop
            }
            inputArr[j + 1] = current;
        }
        return inputArr;
    }

    function insertionSortTasksAlphabetical(inputArrString) {
        let n = inputArrString.length;
        // As long as our i is less than inputArr increment i
        for (let i = 1; i < n; i++) {
            let current = inputArrString[i]; // Store the current item
            // Create a loop to look at previous items. If they are greater we need to shift/copy them to the right.
            let j = i - 1; // Starting at the previous item before i
            while (
                j >= 0 &&
                current.title.localeCompare(inputArrString[j].title) < 0
            ) {
                inputArrString[j + 1] = inputArrString[j]; // Shift the item to the right if both conditions are met
                j--; // Decrement j to close the loop
            }
            inputArrString[j + 1] = current;
        }
        return inputArrString;
    }

    function map(array, func) {
        let temp = [];
        for (const element of array) {
            let result = func(element);
            if (result !== undefined) {
                temp.push(result);
            }
        }
        return temp;
    }

    function filterTasks() {
        let currentDay = new Date()
        let today = new Date(Date.UTC(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate())) 
        let currentDayString = today.toISOString()

        if (!tasks)
            return <img className="loading" src="/loading.svg" alt="loading" />;
        if (tasks.length < 1)
            return <EmptyState message="No Tasks" Icon={FaRegCalendarCheck} />
        let bucketFilteredTasks = map(tasks, (task) => {
            if (
                toDoContext.currentBucket.length === 0 ||
                checkBucketsSelected(task.buckets)
            ) {
                return task;
            }
        });
        switch (counter) {
            case 1:
                bucketFilteredTasks = insertionSortTasksDueDate(bucketFilteredTasks);
                break;
            case 2:
                break;
            case 3:
                bucketFilteredTasks =
                    insertionSortTasksAlphabetical(bucketFilteredTasks);
                break;
            default:
                break;
        }
        return bucketFilteredTasks.map((task) => {
            if (!settings.showCompleted && task.complete === true) {
                return null;
            }
            if (vw === "Day" && task.duedate !== currentDayString){
                return null;
            }
            return <Task key={task._id} task={task} />;
        });
    }

    return (
        <div>
            <div
                name="addTaskCtn"
                className={
                    showAddTask
                        ? "invisible add-task-container"
                        : "visible add-task-container"
                }
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
            ></div>
            <div name="AddTaskForm" className={showAddTask ? "visible" : "invisible"}>
                <AddTask t={""} b={""} cancelEdit={null} />
            </div>
            <div name="taskList" className="task-list">
                {filterTasks()}
            </div>
        </div>
    );
};

export default Tasks;
