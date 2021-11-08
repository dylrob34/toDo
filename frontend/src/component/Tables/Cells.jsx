import React, {useState, useEffect, useRef} from 'react'
import PopupEditBlock from './tools/PopupEditBlock';


const Cells = ({data, timeStrings, height, div, setData, catagories}) => {

    const [title, setTitle] = useState(data.title);
    const [body, setBody] = useState(data.body);
    const [dow, setDow] = useState(data.dow);
    const [time, setTime] = useState(data.time);
    const [duration, setDuration] = useState(data.duration);
    const [catagory, setCatagory] = useState(data.catagory);
    const [isEditing, setIsEditing] = useState(false);
    const [middle, setMiddle] = useState(0);
    const [right, setRight] = useState(0);
    const [popup, setPopup] = useState(false);
    const cellRef = useRef(null);

    // Gets the reference to the DOM cell object and calcs the middle height at the right side
    useEffect(() => {
        if (cellRef.current !== null) {
            const rect = cellRef.current.getBoundingClientRect();
            setMiddle(Math.floor((rect.top + rect.bottom) / 2));
            setRight(rect.right)
        }
    }, [cellRef.current]);

    // Shows popup if you are focused on any child of the parent div (allows popup to stay active while you click around it)
    const handleBlur = e => {
        const currentTarget = e.currentTarget;

        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setIsEditing(false);
                setPopup(false);
            }
        })
    }

    return (
        <div className="table-row" ref={cellRef} style={{minHeight: `${(height * duration / div)-2}px`, backgroundColor: `${catagories.color}`}} onClick={() => setIsEditing(true)} onBlur={handleBlur} onDoubleClick={() => setPopup(true)}>
            <div className='cell'>
            {
                isEditing ?
                    <div className='cell'>
                        <input
                        autoFocus
                        type="text"
                        className="editable-cell"
                        name="title" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>
                            </input>
                            {popup ? 
                                <PopupEditBlock cell={true} s={{top: middle-87, left: right+4}} data={{title, body, dow, time, duration, setTitle}} timeStrings={timeStrings} setData={setData} setPopup={setPopup} className='popup-timeblock'/>
                            :
                            null}
                    </div>
                : 
                    <div title={title} onFocus={() => setIsEditing(true)} className=' cell readonly-cell'>{title}</div>
            }
            </div>
        </div>
    )
}

export default Cells
