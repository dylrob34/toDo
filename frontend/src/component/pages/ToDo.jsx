import React, { useEffect, useState, createContext, useReducer} from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn, getToken } from '../../context/loggedInState';
import { domain } from "../../App";
import {FaAngleRight, FaAngleDoubleRight, FaCommentsDollar} from 'react-icons/fa';
import Tasks from '../Tasking/Tasks'
import AddTask from '../Tasking/AddTask';

// Creating context and enabling a reducer:
export const AddTaskContext = createContext();
function reducer(state, item) {
    return [...state, item]
}

const ToDo = () => {
    const loggedIn = getLoggedIn
    const [showAddTask, setShowAddTask] = useReducer(reducer, false)
    // var showAddTask = useContext(AddTaskContext); // Assigning showAddTask to = AddTaskContext value.

    // Load initially then load again on subsequent changes to toDos
    const [toDos, setToDos]  = useState([]);
    const [hover, setHover] = useState(false);
    // const [showAddTask, setShowAddTask]  = useState(false)

    if (getLoggedIn() === false) {
        return (
            <Redirect to='/login'/>
        )
    }
    
    const handleHover = () => {
        setHover(!hover)
 }
 
    const handleAddTask = () => {
        showAddTask = !showAddTask
        console.log(showAddTask)
        // Dylan, How do I update so that the className sees the change of showAddTask this way
        // since im not using state and using context instead what is the way to get a re-render?
    }

    return (
    <div>
        <AddTaskContext.Provider value={{showAddTask, setShowAddTask}}>
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
            <div name='AddTaskForm' className={'visible'}>
                <AddTask/>
            </div>
            <div className='task-textedit'>
            <Tasks className='tasks'/>
            </div>
        </div>
        </AddTaskContext.Provider>
    </div>
    )
}

export default ToDo
