import Task from './Task'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn } from '../../context/loggedInState';
import { get, post } from "../../tools/request";
import AddTask from '../Tasking/AddTask';
import { useAddTask, useAddTaskUpdate } from '../../context/AddTaskContext'
import { FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import { useToDoContext, useUpdateToDoContext } from '../../context/ToDoContext';



const Tasks = () => {
    const [tasks, setTasks] = useState([])
    const [hover, setHover] = useState(false);
    const loggedIn = getLoggedIn()
    const showAddTask = useAddTask();
    const toggleAddTask = useAddTaskUpdate();
    const toDoContext = useToDoContext();
    const setToDoContext = useUpdateToDoContext();

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
    }, [toDoContext.currentTeam, toDoContext.reloadTasks, tasks, loggedIn])



    const handleHover = () => {
        setHover(!hover)
    }

    function checkBucketsSelected(buckets) {
        for (var i = 0; i < buckets.length; i++) {
            if (toDoContext.currentBucket.includes(buckets[i])) return true;
        }
        return false;
    }

    function setReload(reload) {
        setToDoContext({...toDoContext, reloadTasks: reload})
    }

    return (
        <div>
            <div name='addTaskCtn' className={showAddTask ? 'invisible add-task-container' : 'visible add-task-container'}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}>
                <FaAngleRight name='angleRight' className={hover ? 'invisible add-task-angle' : 'add-task-angle'} />
                <FaAngleDoubleRight name='angleRightDouble' className={hover ? 'add-task-angle hover' : 'invisible add-task-angle'} />
                <button name='addTask' onClick={toggleAddTask}
                    className={hover ? 'add-task-btn hover' : 'add-task-btn'}
                >Add Task</button>
            </div>
            <div name='AddTaskForm' className={showAddTask ? 'visible' : 'invisible'}>
                <AddTask setReload={setReload} t={''} b={''} />
            </div>
            <div name='taskList' className='task-list'>
                {tasks.map((task) => {
                    if (toDoContext.currentBucket.length === 0 || checkBucketsSelected(task.buckets)) {
                        return <Task key={task._id} task={task} setReload={setReload} />
                    }
                    return null;
                })
                }
            </div>
        </div>
    )
}

export default Tasks;
