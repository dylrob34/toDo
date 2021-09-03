import Task from './Task'
import React, { useEffect, useState} from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn, getToken } from '../../context/loggedInState';
import { domain } from "../../App";
import AddTask from '../Tasking/AddTask';
import { useAddTask, useAddTaskUpdate } from '../../context/AddTaskContext'
import {FaAngleRight, FaAngleDoubleRight, FaCommentsDollar} from 'react-icons/fa';



const Tasks = () => {
    const [reload, setReload] = useState(true);
    const [tasks, setTasks] = useState([])
    const [hover, setHover] = useState(false);
    const loggedIn = getLoggedIn()
    const showAddTask = useAddTask();
    const toggleAddTask = useAddTaskUpdate();
    
    useEffect(() => {
        // Fetch todos
        if (loggedIn === true && reload === true) {
            var token = getToken();
            fetch("http://" + domain + "/api/task/getTasks", {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  authorization: "bearer " + token,
                }
            })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.tasks !== undefined) {
                    setTasks(resJson.tasks);
                    setReload(false);
                }
            })
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }, [reload])


    
    const handleHover = () => {
        setHover(!hover)
    }

    return (
        <div>
            <div name='addTaskCtn' className={showAddTask ? 'invisible add-task-container' : 'visible add-task-container'}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}>
                <FaAngleRight name='angleRight' className={hover ? 'invisible add-task-angle' : 'add-task-angle'}/>
                <FaAngleDoubleRight name='angleRightDouble' className={hover ? 'add-task-angle hover' : 'invisible add-task-angle'}/>
                <button name='addTask' onClick={toggleAddTask} 
                className={hover ? 'add-task-btn hover' : 'add-task-btn'}
                >Add Task</button>
            </div>
            <div name='AddTaskForm' className={showAddTask ? 'visible': 'invisible'}>
                <AddTask setReload={setReload}/>
            </div>
            {tasks.map((task) => (
                <Task key={task._id} task={task} setReload={setReload}/>
            ))}
        </div>
    )
}

export default Tasks;