import React, { useState, createContext, useReducer, useContext } from "react";
import { Redirect } from "react-router";
import { getLoggedIn, getToken } from "../../context/loggedInState";
import Tasks from "../Tasking/Tasks";
import Buckets from "../Buckets/Buckets";
import { ToDoProvider } from "../../context/ToDoContext";

const ToDo = () => {

  if (getLoggedIn() === false) {
    return <Redirect to="/login" />;
  }

  return (
    <ToDoProvider>
      <div className="page-config">
        <div className="left-sidebar">
          <div name="viewContainer">
            <div className="left-sb-logo">Views</div>
            <ul name="views" className="left-sb-navigation">
              <li name="dayView" className={"left-sb-element"}>
                {" "}
                Day{" "}
              </li>
              <li name="weekView" className={"left-sb-element"}>
                {" "}
                Week{" "}
              </li>
              <li name="timeblockView" className={"left-sb-element"}>
                {" "}
                TimeBlock{" "}
              </li>
            </ul>
          </div>
          <div className="bucket-container" name="bucketContainer">
            <Buckets/>
          </div>
        </div>
        <div className="main" id="main">
          <div className="task-textedit">
            <Tasks className="tasks" />
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
};

export default ToDo;
