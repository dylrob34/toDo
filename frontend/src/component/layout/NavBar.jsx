import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { logout, getLoggedIn } from "../../context/loggedInState";
import { get } from "../../tools/request";
import { FaUser } from 'react-icons/fa';

function NavBar() {
  const loggedIn = getLoggedIn();

  const [name, setName] = useState("");
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (loggedIn) {
      get("/api/user/getUser")
        .then((resJson) => {
          setName(resJson.user.firstName);
        })
    }
  }, [loggedIn]);

  // const handleScroll=()=>{
  //   var offset=window.scrollY;
  //   if(offset > 15 ) {
  //     setScrolled(true);
  //   } else {
  //     setScrolled(false);
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll',handleScroll)
  // }, [])


  if (loggedIn) {
    return (
      <div>
        <div className='navbar-container'>
          <Link to="/todo" className='navbar-page'>ToDo</Link>
          <Link to="/capture" className='navbar-page'>Capture</Link>
          <Link to="/timeblock" className='navbar-page'>TimeBlock</Link>
          <div className='flex-spacer-4'></div>
          <Link to='/account'><FaUser className="navbar-user-icon"></FaUser></Link>
          <span className='navbar-hello'>Hello, {name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
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