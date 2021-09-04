import React from 'react'
import { FaSun, FaTimes, FaEdit } from 'react-icons/fa'
import { useState } from 'react'
import { post } from "../../tools/request";
import { getToken } from '../../context/loggedInState';


const Task = ({ task, setReload }) => {
    const [title, setTitle] = useState(task.title)
    const [buckets, setBuckets] = useState(task.bucket)
    const [body, setBody] = useState(task.body)
    const [reminder, setReminder] = useState(task.reminder)
    const [dueDate, setDueDate] = useState(task.dueDate)

    function editTask() {
        const token = getToken();
        post("/api/task/editTask", {
            "id": task._id,
            title,
            body
        })
            .then((resJson) => {
                if (resJson.error === true) {
                    console.log("Error submiting new task");
                } else {
                    setReload(true);
                }
            })
    }

    function deleteTask() {
        const token = getToken();
        post("/api/task/deleteTask", { "id": task._id, })
            .then((resJson) => {
                if (resJson.error === true) {
                    console.log("Error submiting new task");
                }
            })
        setReload(true);
    }

    function onBucket(e) {
        setBuckets(e.target.value)
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
    }

    return (
        <div className='task' >
            <h3>{title}</h3>
            <p>{body}</p>
            <FaSun onClick={moveTomorrow} />
            {/* Placeholder for "Move to tomorrow" icon */}
            <FaEdit className='task-edit' onClick={editTask} />
            {/* Edit Task */}
            <FaTimes className='task-delete' onClick={deleteTask} />
            {/* Delete */}

        </div>
    )
}

export default Task


/*
Notes:
This will be the area where I add features to the a given task's template.
This will edit the format of all Tasks that will be mapped in Tasks.jsx file.a

*/