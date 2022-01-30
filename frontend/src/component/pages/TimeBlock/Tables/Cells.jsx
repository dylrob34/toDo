import React, {useState, useEffect, useRef} from 'react'
import { useTimeBlockContext, useUpdateTimeBlockContext } from '../../../../context/TimeBlockContext';
import { post } from '../../../../tools/request';
import PopupEditBlock from '../Popup/PopupEditBlock';
import { setTableData, getTableData, setDragged, unSetDragged, drag, setCount } from './TableData';


const Cells = ({row, col, data, timeStrings, div, addNewBlock}) => {
    const [cellData, setCellData] = useState(data);
    const [colNum, setColNum] = useState(col);
    const [rowNum, setRowNum] = useState(row);
    const [isEditing, setIsEditing] = useState(false);
    const [middle, setMiddle] = useState(0);
    const [right, setRight] = useState(0);
    const [top, setTop] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [popup, setPopup] = useState(false);
    const [draggedOver, setDraggedOver] = useState(false);
    const cellRef = useRef(null);

    const timeBlockContext = useTimeBlockContext();
    const updateTimeBlockContext = useUpdateTimeBlockContext();

    // Gets the reference to the DOM cell object and calcs the middle height at the right side
    useEffect(() => {
        setCellData(data);

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
    }, [cellRef.current, data]);

    const reloadCells = () => {
        updateTimeBlockContext({...timeBlockContext, reloadTimeblocks: true})
    }

    const create = (key, value) => {
        post("/api/timeblocking/createTimeblock", {
            ...cellData,
            [key]: value
        })
        .then((res) => {
            if (res.error === true) {
                alert(`Error Creating new Timeblock\n${res.message}`);
                return;
            }
            setCellData({...data, _id: res.timeblock.id, [key]: value});
            if ( key === 'duration' ) {
                addNewBlock({...data, _id: res.timeblock.id, [key]: value});
            } 
        })
    }

    const save = (key, value) => {
        setCellData({...cellData, [key]: value})
        if (cellData._id === null){
            create(key, value);
            return;
        }
        post("/api/timeblocking/editTimeblock", {
            ...cellData,
            [key]: value
        })
        .then((res) => {
            if (res.error === true) {
                alert(`Error saving your changes.\n${res.message}`)
                return;
            }
            if ( key === 'duration' ) {
                updateTimeBlockContext({...timeBlockContext, reloadTimeblocks: true})
            } 
        })
    }

    const deleteCell = () => {
        post("/api/timeblocking/deleteTimeblock", {_id: cellData._id})
        .then((res) => {
            if (res.error === true) {
                alert(`Error deleting this TimeBlock\n${res.message}`);
            } else {
                updateTimeBlockContext({...timeBlockContext, reloadTimeblocks: true})
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
            if (cellData._id === null) {
                create();
            } else {
            }
        }
    }

    const setDraggedOverState = (state) => {
        setDraggedOver(state);
    }

    const handleMouseDown = (e) => {
        setDragged(dragCell, (count) => {setCellData({...cellData, duration: cellData.duration + count * div})});
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
        <td rowSpan={cellData.duration / div} ref={cellRef} style={{backgroundColor: `${cellData.category === null ? "" : ""}`}} onClick={() => setIsEditing(true)} onMouseUp={handleMouseUp} onBlur={handleBlur} onDoubleClick={() => setPopup(true)}>
            {
                isEditing ?
                    <div className='cell'>
                        <input
                        autoFocus
                        type="text"
                        className="editable-cell"
                        name="title" 
                        id="title"
                        value={cellData.title}
                        onChange={(e) => {save("title", e.target.value)}}
                        onKeyDown={checkEnter} />
                            {popup ? 
                                <PopupEditBlock cell={true} s={{top: middle-150, left: right+4}} data={cellData} timeStrings={timeStrings} save={(key, value) => {setCellData({...cellData, [key]: value}); save(key, value)}} deleteCell={deleteCell} className='popup-timeblock'/>
                            :
                            null}
                        <div className={isEditing ? "draggable-div" : '' } style={{ bottom: '1px'}} onMouseDown={handleMouseDown}>-</div>
                    </div>
                : 
                    <div title={cellData.title} onFocus={() => setIsEditing(true)} className=' readonly-cell'>
                        <div className={isEditing ? "draggable-div" : '' } style={{bottom: '1px'}} onMouseDown={handleMouseDown}></div>
                        {cellData.title}
                    </div>
            }
        </td>
    )
}

export default Cells
