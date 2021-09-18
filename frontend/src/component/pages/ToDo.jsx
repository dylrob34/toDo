import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { getLoggedIn } from "../../context/loggedInState";
import Tasks from "../Tasking/Tasks";
import Buckets from "../Buckets/Buckets";
import { useToDoContext, useUpdateToDoContext } from "../../context/ToDoContext";

const ToDo = (props) => {
  const toDoContext = useToDoContext();
  const setToDoContext = useUpdateToDoContext();

  useEffect(() => {
    var teamName = props.location.pathname.substring(5, props.location.pathname.length);
    if (teamName.length > 0) {
      teamName = teamName.substring(1, teamName.length);
    }
    setToDoContext({...toDoContext, reloadBuckets: true, reloadTasks: true, currentTeam: teamName});
  }, [props.location.pathname])

  if (getLoggedIn() === false) {
    return <Redirect to="/login" />;
  }

  return (
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
  );
};

export default ToDo;
