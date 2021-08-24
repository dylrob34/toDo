import React, { useContext, createContext, useState } from 'react'

const AddTaskContext = createContext();
const AddTaskUpdateContext = createContext();


// Custom Hooks that give us easy access to these values:
export function useAddTask() {
    return useContext(AddTaskContext)
}
export function useAddTaskUpdate() {
    return useContext(AddTaskUpdateContext)
}

// Main Add Task Provider:
// Creating our state
export function AddTaskProvider({ children }) {
    const [showAddTask, setShowAddTask] = useState(false)
// Updating our state
    function toggleAddTask(e) {
        e.preventDefault();
        setShowAddTask(prevShowAddTask => !prevShowAddTask);
        console.log(showAddTask);
    }

    // Passing both of these values down into our children.
    return (
        <AddTaskContext.Provider value={showAddTask}>
            <AddTaskUpdateContext.Provider value={toggleAddTask}> 
                {children}
            </AddTaskUpdateContext.Provider>
        </AddTaskContext.Provider>
    )
}