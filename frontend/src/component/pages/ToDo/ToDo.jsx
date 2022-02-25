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
import Modal from "../../layout/Modal/Modal";
import { post } from "../../../tools/request";

const ToDo = (props) => {
  const toDoContext = useToDoContext();
  const setToDoContext = useUpdateToDoContext();
  const counter = useCounter();
  const counterUpdate = useCounterUpdate();
  const toggleAddTask = useAddTaskUpdate();
  const [popup, setPopup] = useState(false)
  const [reset, setReset] = useState(false);

  // States for the bug handler:
  const [type, setType] = useState('');
  const [page, setPage] = useState('');
  const [description, setDescription] = useState('');

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
        return `, ${bucket.name}`;
      }
    });
  }

  // Function to handle bug submission:
  function handleBugSubmit() {
    let dataBody = {
      type: type,
      page: page,
      desc: description 
    }

    post('/api/bug/submitBug', dataBody).then((resJson) => {
        if (resJson.error === true) {
          console.log("Error submiting bug/suggestion");
        } else {
          alert("Thanks for submitting a bug or suggestion!")
        }
      }
    )
    setPopup(false)
  }


  return (
    <div className="page-config">
      <div className="left-sidebar">
        <div>
          <div name="viewContainer">
            <h3 className="left-header">Views</h3>
            <div className="left-sb-element">
              <FiSquare className="sb-icon" />
              <div name="dayView">Day</div>
            </div>
            <div className="left-sb-element">
              <FiGrid className="sb-icon" />
              <div name="weekView">Look Ahead</div>
            </div>
            <div className="left-sb-element">
              <FiCalendar className="sb-icon" />
              <div name="timeblockView">All Tasks</div>
            </div>
          </div>
        </div>
        <hr className="sidebar-divider" />
        <Buckets />
      </div>
      <div className="main" id="main">
        <div className="toolbar-container">
          <div className="toolbar-element">{selectedBucketName()}</div>
          <div className="toolbar-right">
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
        <div className="bug-button" onClick={() => setPopup(!popup)}>Bug/Suggestion?  
        </div>
        <div className="task-textedit">
          <Tasks className="tasks" />
        </div>
      </div>
    
    {/* Bug Modal */}
      <Modal trigger={popup} setTrigger={setPopup}>
        <div className="modal-background">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-row">
                <h2 className="modal-header">Bugs/Suggestions</h2>
              </div>
                <div className="modal-row" style={{flexDirection:"column"}}>
                  <div>
                    <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                      <option value=""></option>
                      <option value='bug'>Bug</option>
                      <option value='suggestion'>Suggestion</option>
                    </select>
                    <select name="location" id="location" value={page} onChange={(e) => setPage(e.target.value)}>
                      <option value=""></option>
                      <option value="AllPages">All Pages</option>
                      <option value="About">About</option>
                      <option value="Login/Signup">Login/Signup</option>
                      <option value="Accout">Account</option>
                      <option value="todo">ToDo</option>
                      <option value="timeblock">Timeblock</option>
                    </select>
                    <textarea name="description" id="description" cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <div className="m-btn m-btn-lrg" onClick={handleBugSubmit} style={{fontFamily:'Inter, san-serif', backgroundColor:'transparent', color:"white", fontSize:"1rem"}}>Submit</div>
                  </div>
                </div>
              <div
                className="modal-row modal-row-content"
                style={{ padding: "0px 0px 0px 0px" }}>
                <div className="m-btn m-btn-lrg" onClick={() => setPopup(false)}>
                  Close
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    
    </div>
  );
};

export default ToDo;
