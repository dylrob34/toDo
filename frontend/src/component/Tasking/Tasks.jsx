import Task from './Task'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn } from '../../context/loggedInState';
import { get, post } from "../../tools/request";
import AddTask from '../Tasking/AddTask';
import { useAddTask, useAddTaskUpdate } from '../../context/AddTaskContext'
import { FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import { useToDoContext, useUpdateToDoContext } from '../../context/ToDoContext';
import { useCounter, useCounterUpdate } from "../../context/ToDoContext";




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
                            setToDoContext({...toDoContext, reloadTasks: false})
                        }
                    })
            } else {
                post("/api/task/getTeamTasks", {team: toDoContext.currentTeam})
                    .then((resJson) => {
                        if (resJson.tasks !== undefined) {
                            setTasks(resJson.tasks);
                            setToDoContext({...toDoContext, reloadTasks: false})
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

    function setReload(reload) {
        setToDoContext({...toDoContext, reloadTasks: reload})
    }

    function filterTasks(counter) {
        if (counter === 0) {
            tasks.map((task) => {
                if (toDoContext.currentBucket.length === 0 || checkBucketsSelected(task.buckets)) {
                    return <Task key={task._id} task={task} setReload={setReload} />
                }
                return null;
            })
        } else if (counter === 1) {

        } else if (counter === 2) {

        } else if (counter === 3) {

        } else {
            tasks.map((task) => {
                if (toDoContext.currentBucket.length === 0 || checkBucketsSelected(task.buckets)) {
                    return <Task key={task._id} task={task} setReload={setReload} />
                }
                return null;
            })
        }
    }

    return (
        <div>
            <div name='addTaskCtn' className={showAddTask ? 'invisible add-task-container' : 'visible add-task-container'}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}>
            </div>
            <div name='AddTaskForm' className={showAddTask ? 'visible' : 'invisible'}>
                <AddTask setReload={setReload} t={''} b={''} cancelEdit={null} />
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
