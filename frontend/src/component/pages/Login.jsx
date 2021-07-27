import React, { useState } from "react";
import {Link, Redirect} from "react-router-dom";
import { login, logout } from "../../context/loggedInState";
import { domain } from "../../App";

function LoginPage() {
    const [error, setError] = useState("");
    const [details, setDetails] = useState({email:'', password:''});
    const [autoToDo, setAutoToDo] = useState(false);


    // Function to handle on submit of the login button:
    const submitHandler = e => {
        e.preventDefault();
        userLogin(details, setError, setAutoToDo);
    }
  
    if (autoToDo === true) {
      return (
        <Redirect to="/todo" />
      )
    }

return (
    <form onSubmit={submitHandler}>
        <div className="form-inner">
        <h2>Login</h2>
            {(error !=="") ? ((<div className='error'>{error}</div>)) : ""}
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email"
                // On change for event e, call setDetails pulling in what details already is + the value of the event (keystroke)
                // then set the value of the state email in details to ...details + the new keystroke.
                onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id='password' 
                onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>
        <input type="submit" value="LOGIN"></input>
        <Link to="/signup">Create Account</Link>
        </div>
    </form>
)
}

  const userLogin = (details, setError, setAutoToDo) => {
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
        setAutoToDo(true);

      }
    })
  }
  const userLogout = () => {
    console.log("Logged Out.")
    logout();
  }

  export { LoginPage }