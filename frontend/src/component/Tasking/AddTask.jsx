import React, { useState } from "react";
import { useAddTaskUpdate } from "../../context/AddTaskContext";
import { post } from "../../tools/request";
import {
  useToDoContext,
  useUpdateToDoContext,
} from "../../context/ToDoContext";

const AddTask = ({ setReload, t, b, cancelEdit }) => {
  const [title, setTitle] = useState(t);
  const [body, setBody] = useState(b);

  // Using custom hooks from AddTaskContext to update context and state.
  const toggleAddTask = useAddTaskUpdate();
  const toDoContext = useToDoContext();
  const updateToDoContext = useUpdateToDoContext();

  function submitTask(e) {
    toggleAddTask(e);
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

  function cancel(e) {
    setTitle("");
    setBody("");
    if (cancelEdit === null) {
      toggleAddTask(e);
    } else {
      cancelEdit();
    }
  }

  function handleBody() {

    let track = false;
    var newBody = '';
    for (const char in body) {
        if (body[char] === "#") {
            track = true;
            continue
        }
        if (body[char] !== "#") {
            track = false;
            continue
        }
        if (!track) {
            newBody = newBody.concat(body[char]);
        }
    }
    return newBody;
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
              onChange={(e) => setBody(e.target.value)}
              name="taskDetails"
              id=""
              cols="85"
              rows="5"
              className="task-area2"
              placeholder="Task Details..."
              value={body}
            ></textarea>
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
            <button>Add</button>
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
