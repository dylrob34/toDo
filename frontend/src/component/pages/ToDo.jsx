import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";
import Tasks from "../Tasking/Tasks";
import Buckets from "../Buckets/Buckets";
import Sort from "../layout/Sort";
import { FaPlus, FaSort } from 'react-icons/fa';

// Importing custom hooks from our context components for use in this function comp.
import { useCounter, useCounterUpdate } from "../../context/ToDoContext";
import { useToDoContext, useUpdateToDoContext } from "../../context/ToDoContext";
import { getLoggedIn } from "../../context/loggedInState";
import { useAddTask, useAddTaskUpdate } from '../../context/AddTaskContext'


const ToDo = (props) => {
  const toDoContext = useToDoContext();
  const setToDoContext = useUpdateToDoContext();
  const counter = useCounter();
  const counterUpdate = useCounterUpdate();
  const toggleAddTask = useAddTaskUpdate();
  const [reset, setReset] = useState(false)
  const [sort, setSort] = useState(false);

  useEffect( () => {
    if(counter > 3) {
      counterUpdate(0)
    } else {
      console.log(counter)
    }
  }, [counter])

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

  // Function for setting the Sort Feature state
  function toggleSort() {
    setSort(!sort)
  }
  // Function for incrementing the counter by +1, to change display of Sort Feature
  function counterAdd(){
    counterUpdate(counter + 1)
  }

  // Function to show Bucket Name(s) selected by user in the toolbar section to ToDo page
  function selectedBucketName() {
    var currentBuckets = toDoContext.currentBucket;
    return currentBuckets.map(bucket => {return `${bucket.name}, `})
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
          <div className='toolbar-container'>
            <div className='toolbar-element'>{selectedBucketName()}</div>
            <div className='toolbar-element'>
              <FaPlus className='toolbar-item'/>
              <div className='toolbar-item' onClick={toggleAddTask}>New Task</div>
            </div>
            <div className='flex-spacer-end'></div>
              <div className='toolbar-element toolbar-sort' onClick={counterAdd}
              onMouseOver={toggleSort}
              onMouseOut={toggleSort}
              >
                <FaSort className='toolbar-item'/>
                <div className='toolbar-item'>Sort</div>
                <div className={sort ? 'visible':'invisible'}><Sort/></div>
              </div>
          </div>
          <div className="task-textedit">
            <Tasks className="tasks" />
          </div>
        </div>
      </div>
  );
};

export default ToDo;
