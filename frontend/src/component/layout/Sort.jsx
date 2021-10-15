import React, {useState} from 'react'

const Sort = () => {
    const [count, setCount] = useState(0);

    if (count == 1) {
        return <div>FIFO</div>
    }
    if (count == 2) {
        return <div>LIFO</div>
    } 
    if (count == 3) {
        return <div>Alphabetical</div>
    }
    else {
        return (
            <div>
                (Placeholder)
                {/* This will eventually be replaced by nothing..represeting default or no-filter. */}
            </div>
        )
    }

}

export default Sort


// For the Sort component I would like to do a multi-click logic. So on first click it sorts the list by FIFO,
// on the second click it sorts the list by LIFO, on the third click it alphabetical, on fourth click it goes back
// to default (likely LIFO)

// A strech goal would be to only show the title of the kind of sorting that is being done while the item is clicked
// and hovered over. Right now I think a good workign goal is to highlight and

// To make the count work I think I need to be passing a prop or state from the parent element of this component and
// then within this component I need to extract that prop and use it for the new state that I have defined here...
// let me know if you think that is right.