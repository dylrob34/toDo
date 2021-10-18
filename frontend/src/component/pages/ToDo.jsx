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


const ToDo = (props) => {
  const toDoContext = useToDoContext();
  const setToDoContext = useUpdateToDoContext();
  const counter = useCounter();
  const counterUpdate = useCounterUpdate();
  const [reset, setReset] = useState(false)
  const [sort, setSort] = useState(false);

  useEffect( () => {
    if(counter > 3) {
      setReset(true)
      // if(reset === true) {
      //   counterUpdate(counter - 3)
      //   setReset(false)
      //   console.log("if loop: " + counter)
      //   console.log("Reset state: " + reset )
      // }
    } else {
      console.log(counter)
    }
  }, [reset])
  useEffect(() => {
    if(reset === true) {
      counterUpdate(0)
      setReset(false)
      console.log(counter)
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

  function toggleSort() {
    setSort(!sort)
    // counterUpdate()
  }
  function counterAdd(){
    counterUpdate()
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
          <div className='menu-container'>
            <div className='menu-element'>Bucket Name Here</div>
            <div className='menu-element'>
              <FaPlus className='menu-item'/>
              <div className='menu-item'>New Task</div>
            </div>
            <div className='flex-spacer-end'></div>
              <div className='menu-element menu-sort' onClick={counterAdd}
              onMouseOver={toggleSort}
              onMouseOut={toggleSort}
              >
                <FaSort className='menu-item'/>
                <div className='menu-item'>Sort</div>
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
