import React, {useState} from 'react';
import LoginForm from './pages/LoginForm';
import { domain } from '../App.js';
import cookie from 'react-cookies';

const Landing = () => {
  var pending = true;
  var loggedIn = false;

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
        setUser({
          name: resJson.name,
          email: details.email
        });
      }
    })
  }
  const userLogout = () => {
    console.log("Logged Out.")
    setUser({
      name:'',
      email:''
    })
  }

  fetch("https://" + domain + "/api/auth/checkLogin", {
    method: "GET",
    headers: {
      Accept: "application/json",
      authorization: "bearer " + cookie.load("jwt")
    }
  })
  .then((res) => res.json())
  .then((resJson) => {
    if (resJson.loggedIn === true) {
      loggedIn = true;
      pending = false;
    }
  });


    return (
        <div className="landing">
            {(loggedIn === true) ? (
                <div className="welcome">
                <h2>Welcome, <span>{user.name}</span></h2>
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

