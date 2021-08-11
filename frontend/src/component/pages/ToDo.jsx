import React, { useEffect, useState} from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn, getToken } from '../../context/loggedInState';
// import { showAddTask, setShowAddTask } from '../../context/globalStates';
import { domain } from "../../App";
import {FaAngleRight, FaAngleDoubleRight, FaCommentsDollar} from 'react-icons/fa';
import Tasks from '../Tasking/Tasks'
import AddTask from '../Tasking/AddTask';

const ToDo = () => {
    const loggedIn = getLoggedIn

    // Load initially then load again on subsequent changes to toDos
    const [toDos, setToDos]  = useState([]);
    const [hover, setHover] = useState(false);

    const [showAddTask, setShowAddTask]  = useState(false)

    if (getLoggedIn() === false) {
        return (
            <Redirect to='/login'/>
        )
    }
    
    const handleHover = () => {
        setHover(!hover)
 }
 
    const handleAddTask = () => {
        setShowAddTask(!showAddTask)
    }

    return (
    <div>
        <div name='viewContainer' className='left-sidebar'>
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
        <div className='main'>
            <div name='addTaskCtn' className='add-task-container'
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}>
                <FaAngleRight name='angleRight' className={hover ? 'invisible add-task-angle' : 'add-task-angle'}/>
                <FaAngleDoubleRight name='angleRightDouble' className={hover ? 'add-task-angle hover' : 'invisible add-task-angle'}/>
                <button name='addTask' onClick={handleAddTask} className={hover ? 'add-task-btn hover' : 'add-task-btn'}>Add Task</button>
            </div>
            <div name='AddTaskForm' className={showAddTask ? 'visible' : 'invisible'}>
                <AddTask/>
            </div>
            
            <Tasks className='tasks'/>
            <div className='task-textedit'>
            <Tasks className='tasks'/>
            </div>
        </div>
    </div>
    )
}

export default ToDo
