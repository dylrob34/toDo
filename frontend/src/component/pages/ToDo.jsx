import React, { useEffect, useState} from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn, getToken } from '../../context/loggedInState';
import { domain } from "../../App";
import {FaAngleRight, FaAngleDoubleRight, FaCommentsDollar} from 'react-icons/fa';
import Tasks from '../Tasking/Tasks'

const ToDo = () => {
    const loggedIn = getLoggedIn

    // Load initially then load again on subsequent changes to toDos
    const [toDos, setToDos]  = useState([]);
    const [hover, setHover] = useState(false);

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
                <button name='addTask' className={hover ? 'add-task-btn hover' : 'add-task-btn'}>Add Task</button>
            </div>
            <Tasks className='tasks'/>
            <div className='task-textedit'>
            </div>
        </div>
    </div>
    )
}

export default ToDo
