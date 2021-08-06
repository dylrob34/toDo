import Task from './Task'
import React, { useEffect, useState} from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn, getToken } from '../../context/loggedInState';
import { domain } from "../../App";



const Tasks = () => {
    const [reload, setReload] = useState(true);
    const [tasks, setTasks] = useState([
    ])
    const loggedIn = getLoggedIn()
    
    useEffect(() => {
        // Fetch todos
        if (loggedIn === true && reload === true) {
            var token = getToken();
            console.log("Token: " + token);
            fetch("http://" + domain + "/api/toDo/getToDos", {
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
                    setTasks(resJson.toDos);
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
            {tasks.map((task) => (
                <Task key={task._id} task={task} setReload={setReload}/>
            ))}
        </div>
    )
}

export default Tasks;
