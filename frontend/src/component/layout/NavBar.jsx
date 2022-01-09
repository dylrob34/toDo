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

  console.log(window.location.href);

  if (window.location.href.endsWith("/login")) {
    return null;
  }

  return (
    <div>
      <div className="navbar-container">
        <div className="navbar-brand">
          <img alt="Blocks Logo" src="/blocks.svg" className="navbar-logo" />
          <h2>BLOCKZ</h2>
        </div>
        {!loggedIn ? (
          <Link to="/login" className="navbar-login">
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
