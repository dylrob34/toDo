import React, { useState } from "react";
import { useAddTaskUpdate } from "../../context/AddTaskContext";
import { post } from "../../tools/request";
import {
  useToDoContext,
  useUpdateToDoContext,
} from "../../context/ToDoContext";
import AutoFillDropdown from "../layout/AutoFillDropdown";

const AddTask = ({ setReload, t, b, cancelEdit, edit }) => {
  const [title, setTitle] = useState(t);
  const [body, setBody] = useState(b);
  const [autoUsers, setAutoUsers] = useState(false);
  const [sub, setSub] = useState("");

  // Using custom hooks from AddTaskContext to update context and state.
  const toggleAddTask = useAddTaskUpdate();
  const toDoContext = useToDoContext();
  const updateToDoContext = useUpdateToDoContext();

  function submitTask(e) {
    setAutoUsers(false);
    let team = undefined;
    if (toDoContext.currentTeam !== "") {
      team = toDoContext.currentTeam;
    }
    if (edit !== undefined) {
      cancelEdit();
      edit(title, body);
      return;
    }

    toggleAddTask(e);
    post("/api/task/createTask", { title, body, team}).then((resJson) => {
      if (resJson.error === true) {
        console.log("Error submiting new task");
      } else {
        console.log('New Task')
        setTitle("");
        setBody("");
        updateToDoContext({ ...toDoContext, reloadBuckets: true, reloadTasks: true });
      }
    });
  } 
  
  function cancel(e) {
    setAutoUsers(false);
    setTitle("")
    setBody("")
    if (cancelEdit === null) {
      toggleAddTask(e);
    } else {
      cancelEdit();
    }
  }


  function handleBody(body) {
    let found = true;
    let sub = "";
    for (const char in body) {
        if (body[char] === "@") {
            setAutoUsers(true);
            found = true;
        }
        if (char == " ") {
          found = false;
        }
        if (found) {
          sub += char;
        }
    }
    setSub(sub);
    setBody(body);
}

const handleKeyPress = (key) => {
    console.log("key Press");
    console.log(key);
}


  return (
    <div className="task-editor-area">
      <div>
        <form className="add-task-form" onSubmit={submitTask}>
          <div className="textarea-container1">
            <textarea
              onChange={(e) => setTitle(e.target.value)}
              name="taskTitle"
              id="taskTitle"
              cols="85"
              rows="1"
              className="task-area1"
              placeholder="Task Title..."
              value={title}
            ></textarea>
            <textarea
              onChange={(e) => handleBody(e.target.value)}
              onKeyPress={(e) => {handleKeyPress(e.target.value)}}
              name="taskDetails"
              id=""
              cols="85"
              rows="5"
              className="task-area2"
              placeholder="Task Details..."
              value={body}
            >
            </textarea>
              {autoUsers ? <AutoFillDropdown options={toDoContext.teamUsers} text={sub} /> : null}
            {/* 
            USE THIS ONE once you ask Dylan why its not working on submit.
            <div
              contentEditable={true}
              onChange={(e) => setBody(e.target.value)}
              name="taskDetails"
              id="textarea"
              cols="85"
              rows="6"
              className="task-area2"
            >{body}</div> */}
          </div>
          <div className="textarea-container-submit">
            <button name='Submit'>{edit === undefined ? "Add" : "Edit"}</button>
            <button type="button" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

/* Notes:

This needs to get refactored from a textarea into a styled div that I can then seperate into two different text edit
areas. One that is the title of the task and the second that is the details of the task.
Need to then work on getting that into the backend.
I would like to implement some sort of keyword with "#" system so like #Monday would add the task to next Monday's list.

*/
