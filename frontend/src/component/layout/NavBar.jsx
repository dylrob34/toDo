import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout, getLoggedIn } from "../../context/loggedInState";
import { get } from "../../tools/request";
import { FaUser } from "react-icons/fa";
import { Dropdown, Option } from "./Dropdown";

function NavBar({ setTeam }) {
  const loggedIn = getLoggedIn();

  const [name, setName] = useState("");
  const [teams, setTeams] = useState([]);
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    console.log(`am i logged in ${loggedIn}`);
    if (loggedIn) {
      get("/api/user/getUser").then((resJson) => {
        console.log(resJson);
        setName(resJson.user.firstName);
      });
      get("/api/teams/getTeams").then((res) => {
        setTeams(res.teams);
      });
    }
  }, [loggedIn]);

  function clicked(e) {
    setTeam(e.target.innerHTML);
  }

  function pageLoad () {
    window.addEventListener('locationchange', (e) => {
    setPath(window.location.pathname)
    console.log("this is the path: " + path)
  })}
 
  console.log(path)
  return (
    <div>
      {pageLoad()}
      <div className="navbar-container">
        <Link to='/' className="navbar-brand">
          <img alt="Blocks Logo" src="/blocks.svg" className="navbar-logo" />
          <h2>BLOCKZ</h2>
        </Link>
        {!loggedIn ? (

          <Link to="/login" className="navbar-auth">
            Login
          </Link>
        ) : (
          <>
            <Dropdown
              first={
                <Link to="/todo" className="navbar-page">
                  ToDo
                </Link>
              }
            >
              {teams.map((team) => (
                <Option
                  clicked={clicked}
                  key={team.id}
                  value={
                    <Link to={`/todo/${team.id}`} className="navbar-page">
                      {team.name}
                    </Link>
                  }
                />
              ))}
            </Dropdown>
            <Link to="/capture" className="navbar-page">
              Capture
            </Link>
            <Link to="/timeblock" className="navbar-page">
              TimeBlock
            </Link>
            <div className="flex-spacer-4"></div>
            <Link to="/account">
              <FaUser className="navbar-user-icon"></FaUser>
            </Link>
            <span className="navbar-hello">Hello, {name}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
