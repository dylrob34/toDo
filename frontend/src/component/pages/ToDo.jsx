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
    const [hover, setHover] = useState(false);

    const handleHover = () => {
        setHover(!hover)
    }

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

    return (
    <div>
        <div name='view-container' className='left-sidebar'>
            <div className='left-sb-logo'>Views</div>
            <ul className='left-sb-navigation'>
                <li className='left-sb-element'> Day </li>
                <li className='left-sb-element'> Week </li>
                <li className='left-sb-element'> TimeBlock </li>
            </ul>

        </div>
        <div className='main'>
            <div className='add-task-container'
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}>
                <FaAngleRight className={hover ? 'invisible add-task-angle' : 'add-task-angle'}/>
                <FaAngleDoubleRight className={hover ? 'add-task-angle' : 'invisible add-task-angle'}/>
                <button className={'add-task-btn'}>Add Task</button>
            </div>
            <div className='task-textedit'>

            </div>

                {/* <input type='text' className='add-item' placeholder='Add item...'></input> */}
        </div>
    </div>

    )
}

export default ToDo
