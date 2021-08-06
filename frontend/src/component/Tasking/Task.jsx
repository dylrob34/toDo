import React from 'react'
import {FaSun, FaTimes} from 'react-icons/fa'
import { useState } from 'react'

const Task = ({task, setReload}) => {
    const [title, setTitle] = useState(task.title)
    const [body, setBody] = useState(task.body)
    const [reminder, setReminder] = useState(task.reminder)
    const [dueDate, setDueDate] = useState(task.dueDate)
    
    function updateTask() {
        // this is going to update the backend with new task info
    }
    
    function deleteTask() {
        //THis is a placeholder for dylan's delete from backend function
        setReload(true);
    }

    function onTitle(e) {
        setTitle(e.target.value)
    }

    function onBody(e) {
        setBody(e.target.value);
    }

    function onReminder(e) {
        setReminder(e.target.value);
    }

    function moveTomorrow() {
        setDueDate(dueDate + 1);
        updateTask();
    }
    
    return (
        <div className='task' >
            <h3>{title}</h3>
            <p>{body}</p>
            <FaSun onClick={moveTomorrow}/> 
            {/* Placeholder for "Move to tomorrow" icon */}
            <FaTimes/>
            {/* Placeholder for "Delete Task" icon */}

        </div>
    )
}

export default Task


/*
Notes:
This will be the area where I add features to the a given task's template.
This will edit the format of all Tasks that will be mapped in Tasks.jsx file.a

*/