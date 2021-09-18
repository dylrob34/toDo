import React, { useState } from "react";
import {Link, Redirect} from "react-router-dom";
import { login, logout } from "../../context/loggedInState";
import { post } from "../../tools/request";

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
  <div name='Main' className='main-login'>
    <div className='login-panel'>
      <div className='login-element'>
        {/* Placeholder for logo */}
        Placeholder for Logo
      </div>
      <div className='login-element'>
        <form name='Login' onSubmit={submitHandler}>
            <div className="form-inner">
                {(error !=="") ? ((<div className='error'>{error}</div>)) : ""}
                <div className="form-element">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email"
                    // On change for event e, call setDetails pulling in what details already is + the value of the event (keystroke)
                    // then set the value of the state email in details to ...details + the new keystroke.
                    onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="form-element">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id='password' 
                    onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
            <input type="submit" value="LOGIN"></input>
            <Link to="/signup">Create Account</Link>
            </div>
        </form>
      </div>
    </div>
  </div>

)
}

  const userLogin = (details, setError, setAutoToDo) => {
    
    //Added by Dylan to authenticate from backend
    post("/api/auth/login", {
      user: details.email,
      pass: details.password
    })
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
    logout();
  }

  export { LoginPage }