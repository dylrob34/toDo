import React, { useContext, useReducer, useState } from "react";
import { useAddTask, useAddTaskUpdate } from "../../context/AddTaskContext";
import { post } from "../../tools/request";
import { getToken } from "../../context/loggedInState";
import {
  useToDoContext,
  useUpdateToDoContext,
} from "../../context/ToDoContext";

const AddTask = ({ setReload }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Using custom hooks from AddTaskContext to update context and state.
  const toggleAddTask = useAddTaskUpdate();
  const toDoContext = useToDoContext();
  const updateToDoContext = useUpdateToDoContext();

  function submitTask(e) {
    toggleAddTask(e);
    const token = getToken();
    post("/api/task/createTask", { title, body }).then((resJson) => {
      if (resJson.error === true) {
        console.log("Error submiting new task");
      } else {
        setTitle("");
        setBody("");
        setReload(true);
        updateToDoContext({ ...toDoContext, reloadBuckets: true });
      }
    });
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
            <br />
            <textarea
              onChange={(e) => setBody(e.target.value)}
              className=""
              name="taskDetails"
              id=""
              cols="85"
              rows="6"
              className="task-area2"
              placeholder="Task Details..."
              value={body}
            ></textarea>
          </div>
          <div className="textarea-container-submit">
            <button>Add</button>
            <button type="button" onClick={toggleAddTask}>
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
