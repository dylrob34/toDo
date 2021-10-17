import React, {useState, useEffect} from 'react'
// Importing custom hooks from our context components for use in this function comp.
import { useCounter, useCounterUpdate } from "../../context/CounterContext";

const Sort = () => {
    const counter = useCounter();
    
    if (counter == 1) {
        return (<div>(FIFO)</div>)
        
    }
    if (counter == 2) {
        return (<div>(LIFO)</div>)
        
    } 
    if (counter == 3) {
        return (<div>(Alphabetical)</div>)
    }
    else {
        return (
            <div>
                (Default)
                {/* This will eventually be replaced by nothing..represeting default or no-filter. */}
            </div>
        )
    }

}

export default Sort

// 10/16/21: onMouseEnter to show the extra text, onClick to get the counter incremented.
// might need to implement this in ToDo.jsx
// Need to figure out how to reset a counter in jsx. Look on the internet for that one...

// 10/14/21: I think this was addressed.
// For the Sort component I would like to do a multi-click logic. So on first click it sorts the list by FIFO,
// on the second click it sorts the list by LIFO, on the third click it alphabetical, on fourth click it goes back
// to default (likely LIFO)

// A strech goal would be to only show the title of the kind of sorting that is being done while the item is clicked
// and hovered over. Right now I think a good workign goal is to highlight and

// To make the count work I think I need to be passing a prop or state from the parent element of this component and
// then within this component I need to extract that prop and use it for the new state that I have defined here...
// let me know if you think that is right.