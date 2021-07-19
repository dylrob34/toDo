import React, {useState, useEffect} from 'react';
import LoginForm from './pages/LoginForm';
import { domain } from '../App.js';
import cookie from 'react-cookies';
import {login, logout, getToken} from "../loggedInState";

const Landing = ({loggedIn}) => {

  const [error, setError] = useState("");
  const [name, setName] = useState("");

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
      } else if (resJson.loggedIn === true) {
        console.log("logged in");
        login(resJson.token);
      }
    })
  }
  const userLogout = () => {
    console.log("Logged Out.")
    logout();
  }

  useEffect(() => {
    if (loggedIn) {
    var token = getToken();
    console.log("Token: " + token);
    fetch("http://" + domain + "/api/user/getUser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "bearer " + token,
        }
      })
      .then((res) => res.json())
      .then((resJson) => {
        setName(resJson.user.firstName);
      })
    }
  }, [loggedIn]);

  if (loggedIn) {
    return (
      <div className="welcome">
      <h2>Welcome, <span>{name}</span></h2>
      <button onClick={userLogout}>Logout</button>
      </div>
    )
  } else {
    return (
      <LoginForm userLogin={userLogin} error={error} />
    )
  }

}

export default Landing

