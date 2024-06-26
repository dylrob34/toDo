import React, { useContext, createContext, useState } from 'react'

const toDoContext = createContext();
const updateToDoContext = createContext();
const CounterContext = createContext();
const CounterUpdateContext = createContext();
const ViewContext = createContext();
const ViewUpdateContext = createContext();


// Custom Hooks that give us easy access to these values:
export function useToDoContext() {
    return useContext(toDoContext)
}
export function useUpdateToDoContext() {
    return useContext(updateToDoContext)
}
export function useCounter() {
    return useContext(CounterContext)
}
export function useCounterUpdate() {
    return useContext(CounterUpdateContext)
}

// Main Add Task Provider:
// Creating our state
export function ToDoProvider({ children }) {
    const [toDo, setToDo] = useState(
        {
            reloadBuckets : true,
            reloadTasks: true,
            currentBucket: [],
            currentTeam: "",
            teamUsers: []
        })

    const [counter, setCounter] = useState(0)
    const [showCompleted, setShowCompleted] = useState(false)

    

    // Passing both of these values down into our children.
    return (
        <toDoContext.Provider value={toDo}>
            <updateToDoContext.Provider value={setToDo}>
                <CounterContext.Provider value={counter}>
                    <CounterUpdateContext.Provider value={setCounter}>
                        {children}
                    </CounterUpdateContext.Provider>
                </CounterContext.Provider>
            </updateToDoContext.Provider>
        </toDoContext.Provider>
    )
}