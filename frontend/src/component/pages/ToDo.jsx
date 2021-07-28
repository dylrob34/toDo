import React, { useEffect, useState} from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn, getToken } from '../../context/loggedInState';
import { domain } from "../../App";

const ToDo = () => {
    const loggedIn = getLoggedIn

    // Load initially then load again on subsequent changes to toDos
    const [reload, setReload] = useState(true);
    const [toDos, setToDos]  = useState([])

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
        <div name='view-container' className='left-sidebar'>
            <div className='left-sb-logo'>ToDo List Views</div>
            <ul className='left-sb-navigation'>
                <li className='left-sb-element'> Day </li>
                <li className='left-sb-element'> Week </li>
                <li className='left-sb-element'> TimeBlock </li>
            </ul>
        </div>
    )
}

export default ToDo
