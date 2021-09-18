import React from 'react'
import { FaSun, FaTimes, FaEdit, FaCalendar } from 'react-icons/fa'
import { useState } from 'react'
import { post } from "../../tools/request";
import { useToDoContext, useUpdateToDoContext } from '../../context/ToDoContext';

const Schedule = () => {
    return (
        <div className='test'>test</div>
    )
}

const Task = ({ task, setReload }) => {
    const [title, setTitle] = useState(task.title)
    const [hover, setHover] = useState(false)
    const [buckets, setBuckets] = useState(task.buckets)
    const [body, setBody] = useState(task.body)
    const [id, setId] = useState(task._id);
    const [reminder, setReminder] = useState(task.reminder)
    const [dueDate, setDueDate] = useState(task.dueDate)
    const [calendar, setCalendar] = useState(false);
    const toDoContext = useToDoContext();
    const updateToDoContext = useUpdateToDoContext();



    function editTask() {
        post("/api/task/editTask", {
            "id": id,
            title,
            body
        })
            .then((resJson) => {
                if (resJson.error === true) {
                    console.log("Error submiting new task");
                } else {
                    updateToDoContext({...toDoContext, reloadBuckets: true})
                    setReload(true);
                }
            })
    }

    function deleteTask() {
        post("/api/task/deleteTask", { "id": id, })
            .then((resJson) => {
                if (resJson.error === true) {
                    console.log("Error submiting new task");
                }
                setReload(true);
            })
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
    function parseBody() {
        let track = false;
        var newBody = '';
        for (const char in body) {
            if (body[char] === "#") {
                track = true;
                continue
            }
            if (body[char] === " " && track === true) {
                track = false;
                continue
            }
            if (!track) {
                newBody = newBody.concat(body[char]);
            }
        }
        return newBody;
    }

    function toggleCalendar(e) {
        setCalendar(!calendar);
    }
    
    function handleHover() {
        setHover(!hover)
    }

    return (
        <div className='task-item'             
        onMouseEnter={handleHover} 
        onMouseLeave={handleHover}>
            <div className='task-header'>
                <h3 className='task-element task-title'>{title}</h3>
                <div className={`'task-icons' ${hover ? 'task-icons-hover' : ' invisible-icons'}`}>
                    <FaSun className='task-icon' onClick={moveTomorrow} />
                    {/* Placeholder for "Move to tomorrow" icon */}
                    <FaCalendar className='task-delete task-icon' onClick={toggleCalendar}/>
                    <FaEdit className='task-edit task-icon' onClick={editTask} />
                    {/* Edit Task */}
                    <FaTimes className='task-delete task-icon' onClick={deleteTask} />
                    {/* Delete */}
                </div>
            </div>
            <div className='task-body'>
                <p name='taskdetails' className='task-element task-details'>{parseBody()}</p>
                <div className='task-buckets'>
                    {buckets.map((bucket, index) => (
                            <span className='task-bucket task-element'key={index}>#{bucket}</span>
                        ))}
                </div>
            </div>
            <span>   
                {dueDate}
            </span>
            {calendar ? <Schedule/> : null}
        </div>
    )
}

export default Task


/*
Notes:
This will be the area where I add features to the a given task's template.
This will edit the format of all Tasks that will be mapped in Tasks.jsx file.a

*/