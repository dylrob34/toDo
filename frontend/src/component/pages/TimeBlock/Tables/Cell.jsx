import React, { useState, useEffect, useRef } from 'react'
import { post } from '../../../../tools/request';
import { getDOWFromUTC } from '../../../../tools/time';
import PopupEditBlock from '../Popup/PopupEditBlock';
import { getTableData, setInitialValues, clearInitialValues, getInitialValues, setCurrentData, getCurrentData } from './TableData';

let usedTempIds = {};
let tempIdUsed = false;
let currentTimeDuration = null;

const Cells = (props) => {
    const [_id, setId] = useState(props.data._id);
    const [category, setCategory] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [middle, setMiddle] = useState(0);
    const [right, setRight] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [popup, setPopup] = useState(false);
    const [data, setData] = useState(props.data);
    const [dragging, setDragging] = useState(false);
    const [row, setRow] = useState(props.row);
    const [categories, setCategories] = useState(props.categories);
    const [divisions, setDivisions] = useState(props.divisions);
    const [height, setHeight] = useState(props.height);
    const cellRef = useRef(null);
    const titleRef = useRef(props.data.title);

    const timeStrings = props.timeStrings;

    // Gets the reference to the DOM cell object and calcs the middle height at the right side
    useEffect(() => {
        titleRef.current = props.data.title;
        setData(props.data);
        setRow(props.row);
        setCategories(props.categories);
        setDivisions(props.divisions);
        setId(props.data._id);
        setHeight(props.height);
        if (props.data.category === null) setCategory(null);
        for (const cat of props.categories) {
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

    }, [cellRef.current, props.data, props.row, props.categories, props.divisions, props.category, props.height]);

    useEffect(() => {
        if (_id !== null && _id.substring(0, 4) !== "temp" && tempIdUsed) {
            tempIdUsed = false;
            save("_id", _id);
        }
    }, [_id]);

    const create = (newData) => {
        post("/api/timeblocking/createTimeblock", { ...newData })
            .then((res) => {
                if (res.error === true) {
                    alert(`Error Creating new Timeblock\n${res.message}`);
                    return;
                }
                setId(res.timeblock._id);
                delete usedTempIds[newData._id];
            })
    }

    const save = (key, value) => {
        const updatedData = { ...data, [key]: value, _id }
        if (!props.checkTime(updatedData)) {
            alert("Error: Invalid Time or Duration");
            return;
        }
        setData(updatedData);
        titleRef.current = updatedData.title;
        if (key === "category") {
            for (const cat of categories) {
                if (value === cat._id) {
                    setCategory(cat);
                }
            }
        }

        if (_id === null) {
            let tempId = "temp" + Math.floor(Math.random() * 1000);
            while (usedTempIds[tempId] !== undefined) {
                tempId = "temp" + Math.floor(Math.random() * 1000);
            }
            usedTempIds = {...usedTempIds, tempId};
            tempIdUsed = true;
            setId(tempId)
            props.editBlock(data, { ...updatedData, _id: tempId}, key);
            create(updatedData);
            return;
        }
        props.editBlock(data, updatedData, key);
        if (_id.substring(0, 4) === "temp") return;
        post("/api/timeblocking/editTimeblock", {
            ...data,
            [key]: value,
            _id
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
        setPopup(false)
    }

    // Shows popup if you are focused on any child of the parent div (allows popup to stay active while you click around it)
    const handleBlur = e => {
        if (cellRef.current === null) return;
        if (!cellRef.current.contains(e.target) && cellRef.current !== e.target && !cellRef.current.contains(document.activeElement)) {
            if (titleRef.current === "" && _id !== null) {
                console.log(titleRef);
                save("title", "New Block")
            }
            setIsEditing(false);
            setPopup(false);
        }
    }

    const saveNoUpdate = (newData) => {
        post("/api/timeblocking/editTimeblock", newData)
            .then((res) => {
                if (res.error === true) {
                    alert(`Error saving your changes.\n${res.message}`)
                    return;
                }
            })
    }

    const dragUp = (row, initValues) => {
        if ((initValues.row + initValues.duration / 15) - row < 1) return;
        console.log((initValues.row + initValues.duration / 15));
        console.log(row);
        const newData = { ...initValues, time: row*15, duration: initValues.duration + ((initValues.row - row) * 15)};
        if (!props.checkTime(newData)) return;
        if (currentTimeDuration !== null) {
            if (newData.time === currentTimeDuration.time && newData.duration === currentTimeDuration.duration) {
                return;
            }
        }
        currentTimeDuration = {time: newData.time, duration: newData.duration};
        props.setCache(newData)
        props.editBlock({ ...initValues}, newData, "time");
    }

    const dragDown = (row, initValues) => {
        if (row - initValues.row < 0) return;
        const newData = {...initValues, duration: (row - initValues.row) * 15 + 15}
        if (!props.checkTime(newData)) return;
        if (currentTimeDuration !== null) {
            if (newData.duration === currentTimeDuration.duration) {
                return;
            }
        }
        currentTimeDuration = {duration: newData.duration};
        props.setCache(newData)
        props.editBlock(initValues, newData, "duration")
    }

    const stopDragging = (newData) => {
        currentTimeDuration = null;
        setDragging(false);
        saveNoUpdate(newData);
    }

    const onMouseEnter = (i) => {
        props.setDraggedOverRow(row + i)
    }

    const getDragListeners = () => {
        let listeners = [];
        for (let i = 0; i < data.duration / 15; i++) {
            listeners.push(
                <div key={i} className={isEditing && !dragging ? "drag-listener-not" : "drag-listener"} onMouseEnter={() => onMouseEnter(i)} style={{width: right-left, height, top: top + height * i}}/>
                )
        }
        return listeners
    }

    const getStyle = () => {
        const style = {};
        if (category === null) {
            style.backgroundColor = "transparent";
            return style;
        }
        style.backgroundColor = "rgb(" + category.color.r + ", " + category.color.g + ", " + category.color.b + ")"
        return style;
    }

    return (
        <td className="table-data" ref={cellRef} rowSpan={(data.duration / 15)} style={getStyle()} onClick={() => setIsEditing(true)} onBlur={handleBlur} onDoubleClick={() => setPopup(true)}>
            { isEditing ?
                <div className="cell">
                    {getDragListeners()}
                    <div className={dragging ? "draggable-div-dragging" : "draggable-div"} onMouseDown={() => {setDragging(true); props.startDragging({...data, row}, dragUp, stopDragging)}}></div>
                    <input
                        autoFocus
                        id={`id${data.time}${row}`}
                        type="text"
                        className="editable-cell"
                        style={getStyle()}
                        name="title"
                        value={data.title}
                        onFocus={() => {props.setCellCallback(handleBlur, cellRef.current)}}
                        onChange={(e) => { save("title", e.target.value) }}>
                    </input>
                    {popup && !dragging ?
                        <PopupEditBlock {...props} cell={true} s={{ top: middle -150, left: right + 4 }} data={data} timeStrings={timeStrings} save={save} deleteCell={deleteCell} className='popup-timeblock' military={props.military}/>
                        :
                        null}
                    <div className={dragging ? "draggable-div-dragging" : "draggable-div"} onMouseDown={() => {setDragging(true); props.startDragging({...data, row}, dragDown, stopDragging)}}></div>
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