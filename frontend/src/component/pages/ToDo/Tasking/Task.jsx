import React from "react";
import {
  FaSun,
  FaTimes,
  FaEdit,
  FaCalendar,
  FaCheckCircle,
  FaRegCircle,
  FaRegCheckCircle,
  FaCheckSquare,
  FaRegSquare,
  FaGripVertical,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { post } from "../../../../tools/request";
import {
  useToDoContext,
  useUpdateToDoContext,
} from "../../../../context/ToDoContext";
import AddTask from "./AddTask";
import CalendarComponent from "./CalendarComponent";
import { getDayString } from "../../../../tools/time";

const Task = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [hover, setHover] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [body, setBody] = useState(task.body);
  const [id, setId] = useState(task._id);
  const [reminder, setReminder] = useState(task.reminder);
  const [dueDate, setDueDate] = useState(task.duedate);
  const [showDueDate, setShowDueDate] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [completeTask, setCompleteTask] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const toDoContext = useToDoContext();
  const updateToDoContext = useUpdateToDoContext();

  useEffect(() => {
    post("/api/buckets/getTaskBuckets", { _id: task._id }).then((res) => {
      setBuckets(res.buckets);
    });
    setId(task._id);
    setTitle(task.title);
    setBody(task.body);
    setCompleteTask(task.complete);
  }, [task._id, task.title, task.body, task.complete]);

  useEffect(() => {
    setDueDate(task.duedate);
  }, [task.duedate]);

  function editTask(t, b, complete, dd) {
    post("/api/task/editTask", {
      id: id,
      title: t,
      body: b,
      complete,
      duedate: dd,
    }).then((resJson) => {
      if (resJson.error === true) {
        console.log("Error submiting new task");
      } else {
        updateToDoContext({
          ...toDoContext,
          reloadBuckets: true,
          reloadTasks: true,
        });
      }
    });
  }

  function deleteTask() {
    post("/api/task/deleteTask", { id: id }).then((resJson) => {
      if (resJson.error === true) {
        console.log("Error submiting new task");
      }
      updateToDoContext({
        ...toDoContext,
        reloadBuckets: true,
        reloadTasks: true,
      });
    });
  }

  function onBucket(e) {
    setBuckets(e.target.value);
  }
  function onTitle(e) {
    setTitle(e.target.value);
  }

  function onBody(e) {
    setBody(e.target.value);
  }

  function onReminder(e) {
    setReminder(e.target.value);
  }

  const onComplete = async (state) => {
    setCompleteTask(state);
    editTask(title, body, state, dueDate);
  };

  function moveTomorrow() {
    setDueDate(dueDate + 1);
  }

  function parseBody() {
    let track = false;
    var newBody = "";
    for (const char in body) {
      if (body[char] === "#") {
        track = true;
        continue;
      }
      if (body[char] === " " && track === true) {
        track = false;
        continue;
      }
      if (!track) {
        newBody = newBody.concat(body[char]);
      }
    }
    return newBody;
  }

  function toggleCalendar(e) {
    setCalendar(!calendar);
  }

  function handleHover(input) {
    setHover(input);
  }

  function handleDragStart() {
    setDraggable(!draggable);
  }

  if (isEditing) {
    return (
      <AddTask
        t={title}
        b={body}
        complete={completeTask}
        dd={dueDate}
        cancelEdit={() => {
          setIsEditing(false);
          handleHover(false);
        }}
        edit={editTask}
        editing={true}
      />
    );
  } else {
    return (
      <div className="task-shell">
        <div
          draggable={draggable ? true : false}
          className="task-container"
          onMouseOver={() => handleHover(true)}
          onMouseOut={() => handleHover(false)}
        >
          <div className="task-item">
            <div className="task-left">
              {/* <FaGripVertical
                onClick={handleDragStart}
                className={`'task-grip-invisible' ${
                  hover ? "task-grip draggable" : "task-grip-invisible"
                }`}
                onMouseOver={() => handleHover(true)}
                onMouseOut={() => handleHover(false)}
              /> */}
              <FaRegSquare
                onClick={() => {
                  onComplete(true);
                }}
                className={completeTask ? "invisible" : "visible task-complete"}
              />
              <FaCheckSquare
                onClick={() => {
                  onComplete(false);
                }}
                className={completeTask ? "visible task-complete" : "invisible"}
              />
            </div>
            <div className="task-right">
              <div className="header">
                <h3 className="task-title font-header">{title}</h3>
                <div
                  className={`task-icons ${
                    hover ? "task-icons-hover" : " invisible-icons"
                  }`}
                >
                  <button>
                    <FaSun className="task-icon" onClick={moveTomorrow} />
                  </button>
                  <button>
                    <FaCalendar
                      className="task-delete task-icon"
                      onClick={toggleCalendar}
                    />
                  </button>
                  <button>
                    <FaEdit
                      className="task-edit task-icon"
                      onClick={() => setIsEditing(true)}
                    />
                  </button>
                  <button>
                    <FaTimes
                      className="task-delete task-icon"
                      onClick={deleteTask}
                    />
                  </button>
                </div>
              </div>
              <div className="task-body font-body">
              <p name="taskdetails" className={"task-element task-details"}>
                {parseBody()}
              </p>
              <div className="task-lastrow">
                <div className="task-reminder">
                  <span className="task-element reminder ">Reminder</span>
                </div>
                <div className="task-duedate" onClick={toggleCalendar}>
                  <div className="task-element duedate">
                    {dueDate !== null
                      ? getDayString(
                          new Date(
                            new Date(dueDate).getTime() +
                              new Date().getTimezoneOffset() * 60000
                          )
                        )
                      : "No Due Date"}
                  </div>
                </div>
                {calendar ? (
                  <div
                    className="react-calendar-modal"
                    onMouseLeave={() => {
                      setCalendar(false);
                    }}
                  >
                    <CalendarComponent
                      save={(dd) => editTask(title, body, completeTask, dd)}
                      dueDate={dueDate}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="task-buckets">
                  {buckets.map((bucket, index) => (
                    <span className="task-bucket task-element" key={index}>
                      #{bucket}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Task;

/*
Notes:
This will be the area where I add features to the a given task's template.
This will edit the format of all Tasks that will be mapped in Tasks.jsx file.a

*/
