import React, {useState, useEffect, Fragment} from "react";
import { Link } from "react-router-dom";
import {logout, getLoggedIn, getToken} from "../../loggedInState";
import {domain} from "../../App";

function NavBar() {
    const loggedIn = getLoggedIn();

    const [name, setName] = useState("");

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


      if (loggedIn)
      {
          return (
              <div className='nav-container'>
                <div className='navbar-container'>
                  <Link to="/todo" className='navbar-page'>ToDo</Link>
                  <Link to="/capture" className='navbar-page'>Capture</Link>
                  <Link to="/timeblock"className='navbar-page'>TimeBlock</Link>
                </div>

                  <p>Hello, {name}</p>
                  <Link to='/' onClick={logout} className="logout-btn">Logout</Link>
              </div>
          )
      }

     // CK COMMENT: I think I would only like them to see the NavBar if they are logged in else they are forced to login with welcome.
     // CK COMMENT: Additionally, I'd like to add a condition where if they route to Login page then link to Login goes away. 
    return (
        <div>
            {/* <Link to="/">ToDo</Link> */}
            <h1></h1>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default NavBar;