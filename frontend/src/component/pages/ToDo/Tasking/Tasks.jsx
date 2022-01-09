import Task from './Task'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn } from '../../../../context/loggedInState';
import { get, post } from "../../../../tools/request";
import AddTask from '../Tasking/AddTask';
import { useAddTask, useAddTaskUpdate } from '../../../../context/AddTaskContext'
import { FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import { useToDoContext, useUpdateToDoContext } from '../../../../context/ToDoContext';
import { useCounter, useCounterUpdate } from "../../../../context/ToDoContext";




const Tasks = () => {
    const [tasks, setTasks] = useState([])
    const [hover, setHover] = useState(false);
    const loggedIn = getLoggedIn()
    const showAddTask = useAddTask();
    const toggleAddTask = useAddTaskUpdate();
    const toDoContext = useToDoContext();
    const setToDoContext = useUpdateToDoContext();
    const counter = useCounter();
    const counterUpdate = useCounterUpdate();

    useEffect(() => {
        // Fetch task items
        if (loggedIn === true && toDoContext.reloadTasks === true) {
            if (toDoContext.currentTeam === "") {
                get("/api/task/getTasks")
                    .then((resJson) => {
                        if (resJson.tasks !== undefined) {
                            setTasks(resJson.tasks);
                            setToDoContext({...toDoContext, reloadTasks: false, teamUsers: []})
                        }
                    })
            } else {
                setToDoContext({...toDoContext, reloadTasks: false})
                post("/api/task/getTeamTasks", {team: toDoContext.currentTeam})
                    .then((resJson) => {
                        if (resJson.tasks !== undefined) {
                            setTasks(resJson.tasks);
                            setToDoContext({...toDoContext, reloadTasks: false})
                        }
                    })
                post("/api/teams/getTeamsUsers", {team: toDoContext.currentTeam})
                .then((res) => {
                    if (res.users != undefined) {
                        setToDoContext({...toDoContext, teamUsers: insertionSortString(res.users)});
                    } else {
                        setToDoContext({...toDoContext, teamUsers: []});
                    }
                })
            }
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }, [toDoContext, tasks, loggedIn])



    const handleHover = () => {
        setHover(!hover)
    }

    function checkBucketsSelected(buckets) {
        for (const taskBucket of buckets) {
            for (const bucket of toDoContext.currentBucket){
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
            let j = i-1; // Starting at the previous item before i
            while ((j >= 0 ) && (current.localeCompare(inputArrString[j]) < 0 )) {
                inputArrString[j+1] = inputArrString[j]; // Shift the item to the right if both conditions are met
                j--; // Decrement j to close the loop
            }
            inputArrString[j+1] = current;
        }
        return inputArrString
    }

    function insertionSortTasks(inputArrString) {
        let n = inputArrString.length;
        // As long as our i is less than inputArr increment i
        for (let i = 1; i < n; i++) {
            let current = inputArrString[i]; // Store the current item
            // Create a loop to look at previous items. If they are greater we need to shift/copy them to the right.
            let j = i-1; // Starting at the previous item before i
            while ((j >= 0 ) && (current.title.localeCompare(inputArrString[j].title) < 0 )) {
                inputArrString[j+1] = inputArrString[j]; // Shift the item to the right if both conditions are met
                j--; // Decrement j to close the loop
            }
            inputArrString[j+1] = current;
        }
        return inputArrString
    }
    
    function map(array, func) {
        let temp = []
        for (const element of array) {
            let result = func(element) 
            if (result !== undefined) {
                temp.push(result)
            }
        }
        return temp 
    }

    function filterTasks() {
        let bucketFilteredTasks = map(tasks, (task) => {
            if (toDoContext.currentBucket.length === 0 || checkBucketsSelected(task.buckets)) {
                return task
            }
        })
        switch (counter) {
            case 1:
                break
            case 2:
                break
            case 3:
                bucketFilteredTasks = insertionSortTasks(bucketFilteredTasks)
                break
        }
        return bucketFilteredTasks.map((task) => {
            return <Task key={task._id} task={task} />
        })
    }

    return (
        <div>
            <div name='addTaskCtn' className={showAddTask ? 'invisible add-task-container' : 'visible add-task-container'}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}>
            </div>
            <div name='AddTaskForm' className={showAddTask ? 'visible' : 'invisible'}>
                <AddTask t={''} b={''} cancelEdit={null} />
            </div>
            <div name='taskList' className='task-list'>
                <div name="CurrentDay" className='task-list-container'>
                Current DOW Here
                </div>
                <div name="ThisWeek" className='task-list-container'>
                Upcoming Here
                </div>
                <div name="CompletedTasks" className='task-list-container'>
                Archive Here
                </div>
                {
                    filterTasks()
                }
            </div>
        </div>
    )
}

export default Tasks;
