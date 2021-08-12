import React, {useContext, useReducer} from 'react'
import { AddTaskContext } from '../pages/ToDo'

const AddTask = () => {

    const reducer = ''
    const {setShowAddTask} = useContext(AddTaskContext)
    const [addTask, updateAddTask] = useReducer(reducer, false);

    function handleAddTask() {
        setShowAddTask({
            addTask: !addTask,
        })
        updateAddTask();
        console.log(addTask)
    }
    return (
        <div>
            <button>Add</button>
            <button onClick={handleAddTask}>Cancel</button>
        </div>
    )
}

export default AddTask
