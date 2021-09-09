import Task from './Task'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn, getToken } from '../../context/loggedInState';
import { get } from "../../tools/request";
import AddTask from '../Tasking/AddTask';
import { useAddTask, useAddTaskUpdate } from '../../context/AddTaskContext'
import { FaAngleRight, FaAngleDoubleRight, FaCommentsDollar } from 'react-icons/fa';
import { useToDoContext, useUpdateToDoContext } from '../../context/ToDoContext';



const Tasks = () => {
    const [reload, setReload] = useState(true);
    const [tasks, setTasks] = useState([])
    const [hover, setHover] = useState(false);
    const loggedIn = getLoggedIn()
    const showAddTask = useAddTask();
    const toggleAddTask = useAddTaskUpdate();
    const toDoContext = useToDoContext();

    useEffect(() => {
        // Fetch todos
        if (loggedIn === true && reload === true) {
            console.log("refreshing tasks");
            get("/api/task/getTasks")
                .then((resJson) => {
                    if (resJson.tasks !== undefined) {
                        console.log("setting task")
                        setTasks(resJson.tasks);
                        for (const task in tasks) {
                            console.log(`fetched tasks: ${task.title}`)
                        }
                        setReload(false);
                    }
                })
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }, [reload, tasks])



    const handleHover = () => {
        setHover(!hover)
    }

    var test = `
        
        <div>
            <div name='addTaskCtn' className=${showAddTask ? 'invisible add-task-container' : 'visible add-task-container'}
                onMouseEnter=${handleHover}
                onMouseLeave=${handleHover}>
                <FaAngleRight name='angleRight' className=${hover ? 'invisible add-task-angle' : 'add-task-angle'} />
                <FaAngleDoubleRight name='angleRightDouble' className=${hover ? 'add-task-angle hover' : 'invisible add-task-angle'} />
                <button name='addTask' onClick=${toggleAddTask}
                    className=${hover ? 'add-task-btn hover' : 'add-task-btn'}
                >Add Task</button>
            </div>
            <div name='AddTaskForm' className=${showAddTask ? 'visible' : 'invisible'}>
                <AddTask setReload=${setReload} />
            </div>
            <div name='taskList' className='task-list'>
                ${tasks.map((task, index) => {
                    if (toDoContext.currentBucket == "" || task.buckets.includes(toDoContext.currentBucket)) {
                        return task.title
                    }
                })
                }
            </div>
        </div>
    `
    console.log(`Test: ${test}`)
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
                <AddTask setReload={setReload} />
            </div>
            <div name='taskList' className='task-list'>
                {tasks.map((task) => {
                    if (toDoContext.currentBucket == "" || task.buckets.includes(toDoContext.currentBucket)) {
                        return <Task key={task._id} task={task} setReload={setReload} />
                    }
                })
                }
            </div>
        </div>
    )
}

export default Tasks;
