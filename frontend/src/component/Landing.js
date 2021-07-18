import React, {useState} from 'react';
import LoginForm from './pages/LoginForm';
import { domain } from '../App.js';
import cookie from 'react-cookies';
import {login, logout} from "../loggedInState";

const Landing = ({name, email, loggedIn}) => {

  // Variable sets until they are moved to Login state:
  const [user, setUser] = useState({name:'', email:''});
  const [error, setError] = useState("");

  // Method creation until they are moved to a Login state:
  const userLogin = details => {
    console.log(details);
    console.log("fetching from: " + "http://" + domain + "/api/auth/login");

    //Added by Dylan to authenticate from backend
    fetch("http://" + domain + "/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: details.email,
        pass: details.password
      })
    })
    .then((res) => res.json())
    .then((resJson) => {
      if (resJson.error === true) {
        console.log("The login information didn't match...");
        setError("The login information didn't match...");
      } else if (resJson.login === true) {
        console.log("logged in");
        login(cookie.load("jwt"));
      }
    })
  }
  const userLogout = () => {
    console.log("Logged Out.")
    logout();
  }


    return (
        <div className="landing">
            {(loggedIn === true) ? (
                <div className="welcome">
                <h2>Welcome, <span>{name}</span></h2>
                <button onClick={userLogout}>Logout</button>
                </div>
            ) : (
                <LoginForm userLogin={userLogin} error={error} />
            )
            }
        </div>
    )
}

export default Landing

