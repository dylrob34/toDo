import React, {useContext, useReducer} from 'react'
import { useAddTask, useAddTaskUpdate } from '../../context/AddTaskContext'


const AddTask = () => {
// Using custom hooks from AddTaskContext to update context and state.
const toggleAddTask = useAddTaskUpdate();

    return (
        <div>
            <button>Add</button>
            <button onClick={toggleAddTask}>Cancel</button>
        </div>
    )
}

export default AddTask
