import React, { useEffect, useState} from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn, getToken } from '../../context/loggedInState';
import { domain } from "../../App";
import {FaAngleRight, FaAngleDoubleRight} from 'react-icons/fa'

const ToDo = () => {
    const loggedIn = getLoggedIn

    // Load initially then load again on subsequent changes to toDos
    const [reload, setReload] = useState(true);
    const [toDos, setToDos]  = useState([]);
    // const [hover, setHover] = useState(false);
    const [hover, setHover] = useState({
        viewContainer: false,
        views: false,
        addTask: false,
        dayView: false,
        weekView: false,
        timeblockView: false,
        angleRight: false,
        angleRightDouble: false,

    })


    useEffect(() => {
        // Fetch todos
        if (loggedIn === true && reload === true) {
            var token = getToken();
            console.log("Token: " + token);
            fetch("http://" + domain + "/api/todos/getToDos", {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  authorization: "bearer " + token,
                }
            })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.toDos !== undefined) {
                    setToDos(resJson.toDos);
                    setReload(false);
                }
            })
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }, [reload])


    if (getLoggedIn() === false) {
        return (
            <Redirect to='/login'/>
        )
    }
    
    function handleHover(e) {
        console.log(!hover)
        console.log(e.target.name)
        console.log(hover)
        // setHover(!hover)
        setHover({
            ...hover,
            [e.target.name]: !hover
        })
 }

    return (
    <div>
        <div name='viewContainer' className='left-sidebar'>
            <div className='left-sb-logo'>Views</div>
            <ul name='views' className='left-sb-navigation'>
                <li name='dayView' className={hover.dayView ? 'left-sb-element-hover' : 'left-sb-element'}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                > Day </li>
                <li name='weekView' className={hover.weekView ? 'left-sb-element-hover' : 'left-sb-element'}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                > Week </li>
                <li name ='timeblockView' className={hover.timeblockView ? 'left-sb-element-hover' : 'left-sb-element'}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                > TimeBlock </li>
            </ul>

        </div>
        <div className='main'>
            <div name='addTaskCtn' className='add-task-container'
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}>
                <FaAngleRight name='angleRight' className={hover.angleRight ? 'invisible add-task-angle' : 'add-task-angle'}/>
                <FaAngleDoubleRight name='angleRightDouble' className={hover.angleRightDouble ? 'add-task-angle hover' : 'invisible add-task-angle'}/>
                <button name='addTask' className={hover.addTask ? 'add-task-btn hover' : 'add-task-btn'}>Add Task</button>
            </div>
            <div className='task-textedit'>

            </div>

                {/* <input type='text' className='add-item' placeholder='Add item...'></input> */}
        </div>
    </div>

    )
}

export default ToDo
