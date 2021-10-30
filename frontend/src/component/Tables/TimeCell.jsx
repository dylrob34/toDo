import React from 'react'

const TimeCell = ({time, r}) => {
    return (
        <div className="table-row" ref={r}>{time}</div>
    )
}

export default TimeCell
