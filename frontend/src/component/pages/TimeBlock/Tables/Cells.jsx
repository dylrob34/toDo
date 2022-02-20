import React, {useState, useEffect, useRef} from 'react'
import { post } from '../../../../tools/request';
import { getDOWFromUTC } from '../../../../tools/time';
import PopupEditBlock from '../Popup/PopupEditBlock';
import { getTableData, setInitialValues, clearInitialValues, getInitialValues, setCurrentData, getCurrentData } from './TableData';


const Cells = (props) => {
    const [category, setCategory] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [middle, setMiddle] = useState(0);
    const [right, setRight] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [top, setTop] = useState(0);
    const [popup, setPopup] = useState(false);
    const [draggedOver, setDraggedOver] = useState(false);
    const cellRef = useRef(null);

    const data = props.data;
    const categories = props.categories;
    const divisions = props.divisions
    const col = props.col;
    const row = props.row;
    const height = props.height;
    const timeStrings = props.timeStrings;

    // Gets the reference to the DOM cell object and calcs the middle height at the right side
    useEffect(() => {
        for (const cat of categories) {
            if (data.category === cat._id) {
                setCategory(cat);
            }
        }

        if (cellRef.current !== null) {
            const rect = cellRef.current.getBoundingClientRect();
            setMiddle(Math.floor((rect.top + rect.bottom) / 2));
            setRight(rect.right)
            setBottom(rect.bottom);
            setTop(rect.top);
            const tableData = getTableData();
            //setTableData({...tableData, [`${col}${row}`]: {
            //    x: col,
             //   y: row,
            //    top: rect.top,
            //    bottom: rect.bottom,
            //    setDraggedOverState
            //}})
        }
    }, [cellRef.current, props.data.duration, props.data.time]);

    const create = (newData) => {
        post("/api/timeblocking/createTimeblock", {...newData})
        .then((res) => {
            if (res.error === true) {
                alert(`Error Creating new Timeblock\n${res.message}`);
                return;
            }
            props.editBlock(newData, {...newData, _id: res.timeblock._id}, null);
        })
    }

    const save = (key, value) => {
        const updatedData = {...data, [key]: value}
        if (data._id === null){
            props.editBlock(data, {...updatedData, _id: "temp"}, key);
            create(updatedData);
            return;
        }
        if (data._id === "temp") return;
        props.editBlock(data, updatedData, key);
        post("/api/timeblocking/editTimeblock", {
            ...data,
            [key]: value
        })
        .then((res) => {
            if (res.error === true) {
                alert(`Error saving your changes.\n${res.message}`)
                return;
            }
        })
    }

    const deleteCell = () => {
        props.deleteBlock(getDOWFromUTC(data.date), data.time);
        post("/api/timeblocking/deleteTimeblock", {_id: data._id})
        .then((res) => {
            if (res.error === true) {
                alert(`Error deleting this TimeBlock\n${res.message}`);
            }
        })
    }

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

    const checkEnter = (e) => {
        if (e.keyCode === 13) {
            if (data._id === null) {
                create();
            } else {
            }
        }
    }

    const saveNoUpdate = () => {
        const currentData = getCurrentData();
        post("/api/timeblocking/editTimeblock", {
            ...currentData
        })
        .then((res) => {
            if (res.error === true) {
                alert(`Error saving your changes.\n${res.message}`)
                return;
            }
        })}

    const handleMouseDownUp = (e) => {
        setInitialValues(data)
        window.addEventListener("mousemove", dragUp);
        window.addEventListener("mouseup", handleMouseUpUp);
    }

    const handleMouseUpUp = (e) => {
        window.removeEventListener("mousemove", dragUp);
        window.removeEventListener("mouseup", handleMouseUpUp);
        //save("duration", (getCount() + 1) * divisions);
        clearInitialValues();
        saveNoUpdate();
    }

    const handleMouseDown = (e) => {
        setInitialValues(data)
        window.addEventListener("mousemove", dragDown);
        window.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseUp = (e) => {
        window.removeEventListener("mousemove", dragDown);
        window.removeEventListener("mouseup", handleMouseUp);
        //save("duration", (getCount() + 1) * divisions);
        clearInitialValues();
        saveNoUpdate();
    }

    const dragUp = (e) => {
        const timeCells = getTableData();
        const y = e.clientY;
        let count = 0;
        const initValues = getInitialValues();
        let time = initValues.time;
        let duration = initValues.duration;
        for (const cell of timeCells) {
            if (cell.bottom <= bottom && cell.top < y && cell.bottom > y) {
                count = row - cell.row;
                time = time - count * divisions;
                console.log(time);
                duration = duration + count * divisions;
                break;
            }
        }
        setCurrentData({...initValues, time, duration});
        props.editBlock({...initValues, time: data.time}, {...initValues, time, duration}, "time");
    }

    const dragDown = (e) => {
        const timeCells = getTableData();
        const y = e.clientY;
        let count = 0;
        const initValues = getInitialValues();
        let duration = initValues.duration;
        for (const cell of timeCells) {
            if (cell.top >= top && cell.top < y && cell.bottom > y) {
                count = cell.row - row;
                duration = (count + 1) * divisions;
                break;
            }
        }
        setCurrentData({...initValues, duration});
        props.editBlock(initValues, {...initValues, duration}, "duration");
    }

    const dragCell = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const tableData = getTableData();
        let stopped = false;
        let count = 0;
        for (let r = 0; r < 1440 / divisions; r++) {
            const currentCell = tableData[`${col}${r}`];
            if (currentCell === undefined) {
                break;
            }
            if (y > bottom && y > currentCell.top && y < currentCell.bottom) {
                stopped = true;
                currentCell.setDraggedOverState(true);
                count++;
            } else if (y > bottom && y > currentCell.top && currentCell.top > bottom && !stopped) {
                currentCell.setDraggedOverState(true);
                count++;
            } else {
                currentCell.setDraggedOverState(false);
            }
        }
        //setCount(count);
    }
//rgb(" + category.color.r + ", " + category.color.g + ", " + category.color.b + ")"
    return (
        <div className={draggedOver ? "table-row-drag":"table-row"} ref={cellRef} style={{minHeight: `${(height * data.duration / divisions)-2}px`, maxHeight: `${(height * data.duration / divisions)-2}px`, backgroundColor: `${category === null ? "" : "rgb(" + category.color.r + ", " + category.color.g + ", " + category.color.b + ")"}`}} onClick={() => setIsEditing(true)} onBlur={handleBlur} onDoubleClick={() => setPopup(true)}>
            {
                isEditing ?
                    <div className='cell'>
                    <div className={"draggable-div"} style={{ bottom: '1px'}} onMouseDown={handleMouseDownUp}>-</div>
                        <input
                        autoFocus
                        type="text"
                        className="editable-cell"
                        name="title" 
                        id="title"
                        value={data.title}
                        onChange={(e) => {save("title", e.target.value)}}
                        onKeyDown={checkEnter}>
                            </input>
                            {popup ? 
                                <PopupEditBlock {...props} cell={true} s={{top: middle, left: right+4}} data={data} timeStrings={timeStrings} save={save} deleteCell={deleteCell} className='popup-timeblock'/>
                            :
                            null}
                        <div className={"draggable-div"} style={{ bottom: '1px'}} onMouseDown={handleMouseDown}>-</div>
                    </div>
                : 
                    <div title={data.title} onFocus={() => setIsEditing(true)} className=' readonly-cell'>
                        {data.title}
                    </div>
            }
        </div>
    )
}

export default Cells