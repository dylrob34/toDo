import React, { useContext, createContext, useState } from 'react'

const toDoContext = createContext();
const updateToDoContext = createContext();


// Custom Hooks that give us easy access to these values:
export function useToDoContext() {
    return useContext(toDoContext)
}
export function useUpdateToDoContext() {
    return useContext(updateToDoContext)
}

// Main Add Task Provider:
// Creating our state
export function ToDoProvider({ children }) {
    const [toDo, setToDo] = useState(
        {
            reloadBuckets : true,
            currentBucket: ""
        })
// Updating our state
    function updateToDo(newState) {
        setToDo(newState);
    }

    // Passing both of these values down into our children.
    return (
        <toDoContext.Provider value={toDo}>
            <updateToDoContext.Provider value={setToDo}> 
                {children}
            </updateToDoContext.Provider>
        </toDoContext.Provider>
    )
}