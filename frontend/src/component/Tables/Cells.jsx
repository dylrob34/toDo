import React, {useState, useEffect, useRef} from 'react'
import PopupEditBlock from './Popup/PopupEditBlock';
import { setTableData, getTableData, setDragged, unSetDragged, drag, setCount } from './TableData';


const Cells = ({row, col, data, timeStrings, height, div, setData, catagories}) => {
    const [colNum, setColNum] = useState(col);
    const [rowNum, setRowNum] = useState(row);
    const [title, setTitle] = useState(data.title);
    const [body, setBody] = useState(data.body);
    const [dow, setDow] = useState(data.dow);
    const [time, setTime] = useState(data.time);
    const [duration, setDuration] = useState(data.duration);
    const [catagory, setCatagory] = useState(data.catagory);
    const [isEditing, setIsEditing] = useState(false);
    const [middle, setMiddle] = useState(0);
    const [right, setRight] = useState(0);
    const [top, setTop] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [popup, setPopup] = useState(false);
    const [draggedOver, setDraggedOver] = useState(false);
    const cellRef = useRef(null);

    // Gets the reference to the DOM cell object and calcs the middle height at the right side
    useEffect(() => {
        if (cellRef.current !== null) {
            const rect = cellRef.current.getBoundingClientRect();
            setMiddle(Math.floor((rect.top + rect.bottom) / 2));
            setRight(rect.right)
            setTop(rect.top);
            setBottom(rect.bottom);
            setColNum(col);
            setRowNum(row);
            const tableData = getTableData();
            setTableData({...tableData, [`${col}${row}`]: {
                x: col,
                y: row,
                top: rect.top,
                bottom: rect.bottom,
                setDraggedOverState
            }})
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

    const setDraggedOverState = (state) => {
        setDraggedOver(state);
    }

    const handleMouseDown = (e) => {
        setDragged(dragCell, (count) => {setDuration(duration + count * div)});
        window.addEventListener("mousemove", drag);
    }

    const handleMouseUp = (e) => {
        window.removeEventListener("mousemove", drag)
        unSetDragged();
    }

    const dragCell = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const tableData = getTableData();
        let stopped = false;
        let count = 0;
        for (let r = row+div; r < row+100000; r=r+div) {
            const currentCell = tableData[`${col}${r}`];
            if (currentCell === undefined) {
                break;
            }
            if (y > bottom && y > currentCell.top && y < currentCell.bottom) {
                stopped = true;
                currentCell.setDraggedOverState(true);
                count++;
            } else if (y > bottom && y > currentCell.top && !stopped) {
                currentCell.setDraggedOverState(true);
                count++;
            } else {
                currentCell.setDraggedOverState(false);
            }
        }
        setCount(count);
    }

    return (
        <div className={draggedOver ? "table-row-drag":"table-row"} ref={cellRef} style={{minHeight: `${(height * duration / div)-2}px`, maxHeight: `${(height * duration / div)-2}px`, backgroundColor: `${catagories.color}`}} onClick={() => setIsEditing(true)} onMouseUp={handleMouseUp} onBlur={handleBlur} onDoubleClick={() => setPopup(true)}>
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
                        <div className={isEditing ? "draggable-div" : '' } style={{ bottom: '1px'}} onMouseDown={handleMouseDown}>-</div>
                    </div>
                : 
                    <div title={title} onFocus={() => setIsEditing(true)} className=' readonly-cell'>
                        <div className={isEditing ? "draggable-div" : '' } style={{bottom: '1px'}} onMouseDown={handleMouseDown}></div>
                        {title}
                    </div>
            }
        </div>
    )
}

export default Cells
