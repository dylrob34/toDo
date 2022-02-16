import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";
import Tasks from "./Tasking/Tasks";
import Buckets from "./Buckets/Buckets";
import Sort from "../../layout/Sort";
import { FaPlus, FaSort } from "react-icons/fa";
import { FiGrid, FiCalendar, FiSquare } from "react-icons/fi";

// Importing custom hooks from our context components for use in this function comp.
import {
  useCounter,
  useCounterUpdate,
  useToDoContext,
  useUpdateToDoContext,
} from "../../../context/ToDoContext";
import { getLoggedIn } from "../../../context/loggedInState";
import {
  AddTaskProvider,
  useAddTask,
  useAddTaskUpdate,
} from "../../../context/AddTaskContext";

const ToDo = (props) => {
  const toDoContext = useToDoContext();
  const setToDoContext = useUpdateToDoContext();
  const counter = useCounter();
  const counterUpdate = useCounterUpdate();
  const toggleAddTask = useAddTaskUpdate();
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (counter > 3) {
      counterUpdate(0);
    } else {
      console.log("Sort Counter is: " + counter);
    }
  }, [counter, counterUpdate]);

  useEffect(() => {
    var teamName = props.location.pathname.substring(
      5,
      props.location.pathname.length
    );
    if (teamName.length > 0) {
      teamName = teamName.substring(1, teamName.length);
    }
    setToDoContext({
      reloadBuckets: true,
      reloadTasks: true,
      currentBucket: [],
      currentTeam: teamName,
    });
  }, [props.location.pathname]);

  if (getLoggedIn() === false) {
    return <Redirect to="/login" />;
  }

  // Function for displaying the sort options

  // Function for incrementing the counter by +1, to change display of Sort Feature
  function counterAdd() {
    counterUpdate(counter + 1);
  }

  // Function to show Bucket Name(s) selected by user in the toolbar section to ToDo page
  function selectedBucketName() {
    var currentBuckets = toDoContext.currentBucket;
    if (currentBuckets.length === 0) {
      return "No Buckets Selected";
    }
    return currentBuckets.map((bucket, i) => {
      if (i === 0) {
        return bucket.name;
      } else {
        return ` ${bucket.name}`;
      }
    });
  }

  return (
    <div className="page-config">
      <div className="left-sidebar">
        <div>
          <div name="viewContainer">
            <h3 className="left-header">Views</h3>
            <div class="left-sb-element">
              <FiSquare class="sb-icon" />
              <div name="dayView">Day</div>
            </div>
            <div class="left-sb-element">
              <FiGrid class="sb-icon" />
              <div name="weekView">Look Ahead</div>
            </div>
            <div class="left-sb-element">
              <FiCalendar class="sb-icon" />
              <div name="timeblockView">All Tasks</div>
            </div>
          </div>
        </div>
        <hr class="sidebar-divider" />
        <Buckets />
      </div>
      <div className="main" id="main">
        <div className="toolbar-container">
          <div className="toolbar-element">{selectedBucketName()}</div>
          <div class="toolbar-right">
            <div className="toolbar-element toolbar-sort" onClick={counterAdd}>
              <FaSort className="toolbar-item" />
              <div className="toolbar-item">Sort</div>
              <Sort />
            </div>
            <AddTaskProvider>
              <div className="toolbar-element new-task-button" onClick={toggleAddTask}>
                <FaPlus className="toolbar-item" />
                <div className="toolbar-item">New Task</div>
              </div>
            </AddTaskProvider>
          </div>
        </div>
        <div className="bug-button">Bug/Suggestion?</div>
        <div className="task-textedit">
          <Tasks className="tasks" />
        </div>
      </div>
    </div>
  );
};

export default ToDo;
