import React, { useState, useEffect, useRef } from 'react'
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
    const [left, setLeft] = useState(0);
    const [popup, setPopup] = useState(false);
    const [data, setData] = useState(props.data);
    const cellRef = useRef(null);

    const categories = props.categories;
    const divisions = props.divisions
    const col = props.col;
    const row = props.row;
    const height = props.height;
    const timeStrings = props.timeStrings;

    // Gets the reference to the DOM cell object and calcs the middle height at the right side
    useEffect(() => {
        setData(props.data);
        for (const cat of categories) {
            if (props.data.category === cat._id) {
                setCategory(cat);
            }
        }
        if (cellRef.current !== null) {
            const rect = cellRef.current.getBoundingClientRect();
            setMiddle(Math.floor((rect.top + rect.bottom) / 2));
            setRight(rect.right)
            setBottom(rect.bottom + window.scrollY);
            setTop(rect.top + window.scrollY);
            setLeft(rect.left);
        }

    }, [cellRef.current, props.data._id, props.data.duration, props.data.time, props.data.category]);

    const create = (newData) => {
        post("/api/timeblocking/createTimeblock", { ...newData })
            .then((res) => {
                if (res.error === true) {
                    alert(`Error Creating new Timeblock\n${res.message}`);
                    return;
                }
                props.editBlock(newData, { ...newData, _id: res.timeblock._id }, null);
            })
    }

    const save = (key, value) => {
        const updatedData = { ...data, [key]: value }
        if (data._id === null) {
            props.editBlock(data, { ...updatedData, _id: "temp" }, key);
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
        post("/api/timeblocking/deleteTimeblock", { _id: data._id })
            .then((res) => {
                if (res.error === true) {
                    alert(`Error deleting this TimeBlock\n${res.message}`);
                }
            })
    }

    // Shows popup if you are focused on any child of the parent div (allows popup to stay active while you click around it)
    const handleBlur = e => {
        console.log(cellRef.current);
        console.log(e.target);
        if (!cellRef.current.contains(e.target) && cellRef.current !== e.target) {
            setIsEditing(false);
            setPopup(false);
        }
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
            })
    }

    const dragUp = (row, initValues) => {
        console.log(row);
        console.log(row*15);
        console.log(initValues.duration + ((initValues.row - row) * 15))
        props.editBlock({ ...initValues}, { ...initValues, time: row*15, duration: initValues.duration + ((initValues.row - row) * 15)}, "time");
    }

    const dragDown = (row, initValues) => {
        props.editBlock(initValues, {...initValues, duration: (row - initValues.row) * 15 + 15})
    }

    const dragUpp = (e) => {
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
        setCurrentData({ ...initValues, time, duration });
    }

    const dragDownp = (e) => {
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
        setCurrentData({ ...initValues, duration });
        props.editBlock(initValues, { ...initValues, duration }, "duration");
    }

    const onMouseEnter = (i) => {
        props.setDraggedOverRow(row + i)
    }

    const getDragListeners = () => {
        let listeners = [];
        for (let i = 0; i < data.duration / 15; i++) {
            listeners.push(
                <div key={i} className="drag-listener" onMouseEnter={() => onMouseEnter(i)} style={{width: right-left, height: ((bottom-top) / (data.duration / 15)), top: top + (bottom-top) / (data.duration/15) * i}}/>
                )
        }
        return listeners
    }

    const getBackgroundColor = () => {
        if (category === null) return null;
        if (isEditing === true) return null;
        return "rgb(" + category.color.r + ", " + category.color.g + ", " + category.color.b + ")"
    }

    //rgb(" + category.color.r + ", " + category.color.g + ", " + category.color.b + ")"
    return (
        <td className="table-data" ref={cellRef} rowSpan={data.duration / divisions} style={{ backgroundColor:  getBackgroundColor()}} onClick={() => setIsEditing(true)} onBlur={handleBlur} onDoubleClick={() => setPopup(true)}>
            { isEditing ?
                <div className="cell">
                    {getDragListeners()}
                    <div className="draggable-div" onMouseDown={() => props.startDragging({...data, row}, dragUp)}></div>
                    <input
                        autoFocus
                        type="text"
                        className="editable-cell"
                        name="title"
                        value={data.title}
                        onFocus={() => {console.log("setting"); props.setCellCallback(handleBlur, cellRef.current)}}
                        onChange={(e) => { save("title", e.target.value) }}>
                    </input>
                    {popup ?
                        <PopupEditBlock {...props} cell={true} s={{ top: middle - 150, left: right + 4 }} data={data} timeStrings={timeStrings} save={save} deleteCell={deleteCell} className='popup-timeblock' />
                        :
                        null}
                    <div className="draggable-div" onMouseDown={() => props.startDragging({...data, row}, dragDown)}></div>
                </div>
                :
                <div className="cell-notediting">
                    {getDragListeners()}
                    {data.title}
                </div>
            }
        </td>
    )
}

export default Cells