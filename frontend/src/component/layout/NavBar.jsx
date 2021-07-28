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
                  <Link to="/timeblock"className='navbar-page navbar-page-spc'>TimeBlock</Link>
                  <Link to='/account'><FaUser className="navbar-user-icon"></FaUser></Link>
                  <Link to='/' onClick={logout} className="logout-btn navbar-page">Logout</Link>
              </div>
                <span className='navbar-hello'>Hello, {name}</span>
                {/* Might want to take this Hello, {name} and put it in on a Landing page or something. Its a bit clunky on NavBar (CK 7/27/21) */}
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