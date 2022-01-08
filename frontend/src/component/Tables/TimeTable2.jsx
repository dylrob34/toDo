import React, {useState, useEffect, useRef} from 'react'
import { useTimeBlockContext, useUpdateTimeBlockContext } from '../../context/TimeBlockContext';
import { post, get } from "../../tools/request";
import Cells from './Cells';
import TimeCell from './TimeCell'; // Don't know if need a different type of cell component for the Admin col, but its late and I didnt want to think.
import PopupEditBlock from './Popup/PopupEditBlock';
import { FaCommentAlt, FaMicrophoneAltSlash, FaRegBuilding } from 'react-icons/fa';
import {getTableData} from "./TableData";




const TimeTable2 = () => {
    const [divisions, setDivisions] = useState(30);
    const [military, setMilitary] = useState(false);
    const [height, setHeight] = useState(0);
    const [cellHeight, setCellHeight] = useState(0);
    const [data, setData] = useState([]);
    const [catagories, setCategories] = useState({});
    const heightRef = useRef(null);
    const [timeStrings, setTimeStrings] = useState({});
    const timeblockContext = useTimeBlockContext();
    const updateTimeblockContext = useUpdateTimeBlockContext();

    const dataDefault = {
        title: "Test",
        body: "something",
        dow: "Monday",
        time: 450,
        duration: 60,
        catagory: "Test"
    }

    const categoriesDefault = {
        name: "Test",
        description: "None",
        color: "#34B487"
    }

    useEffect(() => {
        if (timeblockContext.reloadTimeblocks) {
            get("/api/timeblocking/getTimeblocks")
            .then((res) => {
                if (res.timeblocks === undefined) {
                    setData([]);
                } else {
                    setData(res.timeblocks);
                }
                updateTimeblockContext({...timeblockContext, reloadTimeblocks: false});
            })
        }
        if (heightRef.current !== null) {
            setCellHeight(heightRef.current.getBoundingClientRect().height);
        }
        var strings = {};
        for(var i = 0; i < 1440; i+=divisions) {
            let hourMath = (i % 60 === 0) ? i:i-(i % 60)
            let hour = hourMath/60;
            if (!military) {
                hour = (hour > 12) ? hour - 12: (hour === 0) ? 12 : hour;
            }
            let minute = i % 60;
            minute = (minute === 0) ? "00" : minute;
            strings[i] = `${hour}:${minute}`;
        }
        setTimeStrings(strings);
    }, [heightRef.current, divisions, timeblockContext.reloadTimeblocks]);


    function timeLoop() {
        var timerows = [];
        for(var i = 0; i < 1440; i+=divisions) {
            let hourMath = (i % 60 === 0) ? i:i-(i % 60)
            let hour = hourMath/60;
            if (!military) {
                hour = (hour > 12) ? hour - 12: (hour === 0) ? 12 : hour;
            }
            let minute = i % 60;
            minute = (minute === 0) ? "00" : minute;
            timerows.push(< TimeCell key={i} time={`${hour}:${minute}`} r={heightRef}/>)
        }
        return timerows
    }

    const setTheData = (newData) => {
        setData([...data, newData]);
    }

    function fill(day, colNum) {
        console.log("filling")
        let cells = [];
        for (var i = 0; i < 1440; i += divisions) {
            let found = false;
            for (let datum of data) {
                if (datum.time === i && datum.dow === day) {
                    found = true;
                    cells.push(<Cells key={datum.title} row={i} col={colNum} data={datum} timeStrings={timeStrings} height={cellHeight} div={divisions} setData={setTheData}/>)
                    if (datum.duration > divisions) {
                        i += datum.duration - divisions;
                    }
                }
            }
            if (!found) {
                cells.push(<Cells key={i} row={i} col={colNum} data={{ title: '', body: '', dow: day, time: i, duration: divisions, catagory: "" }} timeStrings={timeStrings} height={cellHeight} div={divisions} setData={setTheData}/>)
            }
        }
        console.log(getTableData());
        return cells;
    }

    const dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    console.log("Cell Height: " + cellHeight);
    return (
            <div className='table-blockz'>
                <div className='table-col' name='admin'>
                    <div className="table-row admin-cell">Admin</div>
                    {timeLoop()}
                </div>
                {
                    dow.map((day, index) => {
                        return (
                            <div className="table-col" >
                                <div className="table-row admin-cell">
                                    {day}
                                </div>
                                {fill(day, index)}
                            </div>
                        )
                    })
                }
            </div>
    )
}

// const Blank = ({d, t, timeStrings, height, setData}) => {
//     const [dow, setDow] = useState(d);
//     const [time, setTime] = useState(t);
//     const [popup, setPopup] = useState(false)
//     const [middle, setMiddle] = useState(0);
//     const [right, setRight] = useState(0);
//     const topRef = useRef(null);

//     useEffect(() => {
//         if (topRef.current !== null) {
//             const rect = topRef.current.getBoundingClientRect();
//             setMiddle(Math.floor((rect.top + rect.bottom) / 2));
//             setRight(rect.right)
//         }
//     }, [topRef.current]);

//     function handlePopup (e) {
//         //e.target.focus();
//         setPopup(true)
//     }

//     const handleBlur = e => {
//         const currentTarget = e.currentTarget;

//         setTimeout(() => {
//             if (!currentTarget.contains(document.activeElement)) {
//                 setPopup(false);
//             }
//         })
//     }
    
//     const data = {
//         title: "",
//         body: "",
//         dow,
//         time
//     }

//     return (
//         <div className='table-blank' ref={topRef} onDoubleClick={handlePopup} onBlur={handleBlur} style={{height: height}} >
//             <div className='table-row table-fill' >
//                 fill
//             </div>
//             {
//                 popup ? <PopupEditBlock cell={false} s={{top: middle-48, left: right+4}} data={data} timeStrings={timeStrings} setData={setData} setPopup={setPopup} className='popup-timeblock' trigger={popup} setTrigger={setPopup}/> : null
//             }       
//         </div>
        
//     )
// }


export default TimeTable2

// Need to make a cell react component that can be the output of a for loop when iterated over.
// The for loop logic needs to ask whether this space needs to be populated by a cell or if it need to be filled with a task.
// We need to have the option toggle how many divisions there are and this would be changed by the user defined number of incremetns that they want.

// Stack Overflow reference:
// https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
