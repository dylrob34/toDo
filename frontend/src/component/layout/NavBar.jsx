import React, {useState, useEffect, Fragment} from "react";
import { Link } from "react-router-dom";
import {logout, getLoggedIn, getToken} from "../../context/loggedInState";
import {domain} from "../../App";
import {FaUser} from 'react-icons/fa'

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
            <div className='navbar-container'>
              <div className='navbar-container-start'>
                  <Link to="/todo" className='navbar-page'>ToDo</Link>
                  <Link to="/capture" className='navbar-page'>Capture</Link>
                  <Link to="/timeblock"className='navbar-page'>TimeBlock</Link>
                  <div className='navbar-page-spc'></div>
                  <Link to='/account'><FaUser className="navbar-user-icon"></FaUser></Link>
                  <span className='navbar-hello'>Hello, {name}</span>
                  <button onClick={logout} className="logout-btn navbar-page">Logout</button>
              </div>
            </div>
          )
      }
    return (
        <div>
            <h1></h1>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default NavBar;