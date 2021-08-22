import React, {useContext, useReducer} from 'react'
import { useAddTask, useAddTaskUpdate } from '../../context/AddTaskContext'


const AddTask = () => {
// Using custom hooks from AddTaskContext to update context and state.
const toggleAddTask = useAddTaskUpdate();

    return (
        <div className='task-editor-area'>
            <div>
                <form className='add-task-form'>
                    <div className='textarea-container1'>
                        <textarea name="taskTitle" id="taskTitle" cols="85" rows="1" 
                        className='task-area1' placeholder='Task Title...'>
                        </textarea>
                        <br />
                        <textarea className='' name="taskDetails" id="" cols="85" rows="6" 
                        className='task-area2' placeholder='Task Details...'>
                        </textarea>
                    </div>
                    <div className='textarea-container-submit'>
                        <button>Add</button>
                        <button onClick={toggleAddTask}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask


/* Notes:

This needs to get refactored from a textarea into a styled div that I can then seperate into two different text edit
areas. One that is the title of the task and the second that is the details of the task.
Need to then work on getting that into the backend.
I would like to implement some sort of keyword with "#" system so like #Monday would add the task to next Monday's list.

*/