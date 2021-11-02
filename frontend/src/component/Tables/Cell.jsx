import React, {useState, useEffect, useRef, Fragment} from 'react'
import PopupEditBlock from './tools/PopupEditBlock';

const Cell = ({data, height, div, timeStrings}) => {
    const [title, setTitle] = useState(data.title);
    const [body, setBody] = useState(data.body);
    const [dow, setDow] = useState(data.dow);
    const [time, setTime] = useState(data.tiem);
    const [duration, setDuration] = useState(data.duration);
    const [isEditing, setIsEditing] = useState(false);
    const [middle, setMiddle] = useState(0);
    const [right, setRight] = useState(0);
    const topRef = useRef(null);

    useEffect(() => {
        if (topRef.current !== null) {
            const rect = topRef.current.getBoundingClientRect();
            setMiddle(Math.floor((rect.top + rect.bottom) / 2));
            setRight(rect.right)
        }
    }, [topRef.current]);

    const setData = (newData) => {
        setTitle(newData.title);
        setBody(newData.body);
        setDow(newData.dow);
        setTime(newData.time);
        setDuration(newData.duration);
    }

    const setPopup = () => {
        return;
    }

    const handleBlur = e => {
        const currentTarget = e.currentTarget;

        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                editBlock(false);
            }
        })
    }
    
    function editBlock(edit) {
        setIsEditing(edit);
    }
    console.log(`Text Height: ${height * duration / div}`)
    const cellHeight = height * duration / div;
    return (
        <div className="table-row" ref={topRef} style={{minHeight: `${cellHeight-2}px`}} onClick={() => editBlock(true)} onBlur={handleBlur}>
            {
                isEditing ?
                    <div>
                        <input
                        autoFocus
                        type="text"
                        className="editable-cell"
                        name="title" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>
                            </input>
                            <PopupEditBlock cell={true} s={{top: middle-48, left: right+4}} data={data} timeStrings={timeStrings} setData={setData} setPopup={setPopup} className='popup-timeblock'/>
                    </div>
                : 
                    <div title={title} onFocus={editBlock} className='readonly-cell'>{title}</div>
            }
        </div>
    )
}


export default Cell

