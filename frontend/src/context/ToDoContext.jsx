import React, { useContext, createContext, useState } from 'react'

const toDoContext = createContext();
const updateToDoContext = createContext();
const CounterContext = React.createContext();
const CounterUpdateContext = React.createContext();
const sortTypeContext = React.createContext();
const sortTypeUpdateContext = React.createContext();


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

export function useSortType() {
    return useContext(sortTypeContext)
}

export function useSortTypeUpdate() {
    return useContext(sortTypeUpdateContext)
}

// Main Add Task Provider:
// Creating our state
export function ToDoProvider({ children }) {
    const [toDo, setToDo] = useState(
        {
            reloadBuckets : true,
            reloadTasks: true,
            currentBucket: [],
            currentTeam: ""
        })

    const [counter, setCounter] = useState(0)
    const [sortType, setSortType] = useState('Default')

    

    // Passing both of these values down into our children.
    return (
        <toDoContext.Provider value={toDo}>
            <updateToDoContext.Provider value={setToDo}>
                <CounterContext.Provider value={counter}>
                    <CounterUpdateContext.Provider value={setCounter}>
                        <sortTypeContext.Provider value={sortType}>
                            <sortTypeUpdateContext.Provider value={setSortType}>
                                {children}
                            </sortTypeUpdateContext.Provider>
                        </sortTypeContext.Provider>
                    </CounterUpdateContext.Provider>
                </CounterContext.Provider>
            </updateToDoContext.Provider>
        </toDoContext.Provider>
    )
}