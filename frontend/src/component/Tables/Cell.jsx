import React, {useState} from 'react'

const Cell = ({data}) => {
    const [title, setTitle] = useState(data.title);
    const [body, setBody] = useState(data.body);
    const [dow, setDow] = useState(data.dow);
    const [time, setTime] = useState(data.tiem);
    const [duration, setDuration] = useState(data.duration);

    return (
        <div className="table-col">
            <div className='table-row'>{title}</div>
        </div>
    )
}

export default Cell
