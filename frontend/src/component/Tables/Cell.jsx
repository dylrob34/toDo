import React, {useState, useRef, Fragment} from 'react'

const Cell = ({data, height, div}) => {
    const [title, setTitle] = useState(data.title);
    const [body, setBody] = useState(data.body);
    const [dow, setDow] = useState(data.dow);
    const [time, setTime] = useState(data.tiem);
    const [duration, setDuration] = useState(data.duration);
    const [isEditing, setIsEditing] = useState(false);
    
    function editBlock(edit) {
        setIsEditing(edit);
    }
    console.log(`Text Height: ${height * duration / div}`)
    const cellHeight = height * duration / div;
    return (
        <div className="table-row" style={{minHeight: `${cellHeight-2}px`}} onClick={() => editBlock(true)} onBlur={() => editBlock(false)}>
            {
                isEditing ?
                        <input
                        autoFocus
                        type="text"
                        className="editable-cell"
                        name="title" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>
                            </input>
                : 
                    <div title={title} onFocus={editBlock} className='readonly-cell'>{title}</div>
            }
        </div>
    )
}


export default Cell

