import React, {useState, useEffect} from "react";
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
              <div>
                  <Link to="/">ToDo</Link>
                  <p>Hello, {name}</p>
                  <button onClick={logout}>Logout</button>
              </div>
          )
      }

    return (
        <div>
            <Link to="/">ToDo</Link>
            <h1></h1>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default NavBar;