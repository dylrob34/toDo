import React, {useContext, createContext, useState} from 'react'

const timeBlockContext = createContext();
const updateTimeBlockContext = createContext();

export function useTimeBlockContext() {
    return useContext(timeBlockContext);
}

export function useUpdateTimeBlockContext() {
    return useContext(updateTimeBlockContext);
}

export function TimeBlockProvider({ children }) {
    const [timeblock, setTimeblock] = useState({
        reloadTimeblocks: true,
        reloadCategories: true,
    })
    
    return (
        <timeBlockContext.Provider value={timeblock}>
            <updateTimeBlockContext.Provider value={setTimeblock}>
                {children}
            </updateTimeBlockContext.Provider>
        </timeBlockContext.Provider>
    )
}

