import React, { useState, createContext, useReducer, useContext } from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn, getToken } from '../../context/loggedInState';
import { domain } from "../../App";
import {FaAngleRight, FaAngleDoubleRight, FaCommentsDollar} from 'react-icons/fa';
import Tasks from '../Tasking/Tasks'
import AddTask from '../Tasking/AddTask';
import { useAddTask, useAddTaskUpdate } from '../../context/AddTaskContext'
import Buckets from '../Buckets/Buckets';

const ToDo = () => {
    const loggedIn = getLoggedIn

    // Load initially then load again on subsequent changes to toDos
    const [toDos, setToDos]  = useState([]);
    const [hover, setHover] = useState(false);
    // Using custom hooks from AddTaskContext to update context and state.
    const showAddTask = useAddTask();
    const toggleAddTask = useAddTaskUpdate();


    if (getLoggedIn() === false) {
        return (
            <Redirect to='/login'/>
        )
    }
    
    const handleHover = () => {
        setHover(!hover)
 }
 
    return (
    <div>
        <div className='left-sidebar'>
            <div name='viewContainer'>
                <div className='left-sb-logo'>Views</div>
                <ul name='views' className='left-sb-navigation'>
                    <li name='dayView' className={'left-sb-element'} 
                    > Day </li>
                    <li name='weekView' className={'left-sb-element'}
                    > Week </li>
                    <li name ='timeblockView' className={'left-sb-element'}
                    > TimeBlock </li>
                </ul>
            </div>
            <div className='bucket-container' name='bucketContainer'>
                <Buckets/>
            </div>
        </div>
        <div className='main'>
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
                <AddTask/>
            </div>
            <div className='task-textedit'>
            <Tasks className='tasks'/>
            </div>
        </div>
    </div>
    )
}

export default ToDo
