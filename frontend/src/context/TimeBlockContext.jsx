import React, {useContext, createContext, useState, useEffect} from 'react';
import { post, get } from "../tools/request";
import { getCurrentWeek } from '../tools/time';

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
        timeblocks: {},
        categories: [],
        divisions: 30,
        week: null
    })

    const roloadTimeblocks = () => {
        post("/api/timeblocking/getTimeblocksWeek", {week: timeblock.week})
        .then((res) => {
            if (res.timeblocks !== undefined) {
                setTimeblock({...timeblock, timeblocks: res.timeblocks, reloadTimeblocks: false})
            }
        })
    }

    const reloadCategories = () => {
        get("/api/categories/getCategories")
        .then((res) => {
            if (res.categories !== undefined) {
                setTimeblock({...timeblock, categories: res.categories, reloadCategories: false});
            }
        })
    }

    const setWeek = () => {

    }

    useEffect(() => {
        if (timeblock.week === null)
        {
            const currentweek = getCurrentWeek();
            setTimeblock({...timeblock, week: currentweek})
            return;
        }
    }, [timeblock.week, timeblock.reloadCategories, timeblock.reloadTimeblocks])
    
    return (
        <timeBlockContext.Provider value={timeblock}>
            <updateTimeBlockContext.Provider value={undefined}>
                {children}
            </updateTimeBlockContext.Provider>
        </timeBlockContext.Provider>
    )
}

