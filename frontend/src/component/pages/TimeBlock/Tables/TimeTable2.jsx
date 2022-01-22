import React, {useState, useEffect, useRef} from 'react'
import { useTimeBlockContext, useUpdateTimeBlockContext } from '../../../../context/TimeBlockContext';
import { post } from "../../../../tools/request";
import Cells from './Cells';
import TimeCell from './TimeCell'; // Don't know if need a different type of cell component for the Admin col, but its late and I didnt want to think.




const TimeTable2 = () => {
    const [military, setMilitary] = useState(false);
    const [height, setHeight] = useState(0);
    const [cellHeight, setCellHeight] = useState(0);
    const [data, setData] = useState([]);
    const [timeStrings, setTimeStrings] = useState({});
    const heightRef = useRef(null);
    const timeblockContext = useTimeBlockContext();
    const updateTimeblockContext = useUpdateTimeBlockContext();
    const divisions = timeblockContext.divisions;

    useEffect(() => {
        if (timeblockContext.reloadTimeblocks && timeblockContext.week !== null) {
            post("/api/timeblocking/getTimeblocksWeek", {week: timeblockContext.week})
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


    const addNewBlock = (block) => {
        setData([...data, block]);
    }

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

    function fill(day, colNum) {
        let cells = [];
        for (var i = 0; i < 1440; i += divisions) {
            let found = false;
            for (let datum of data) {
                if (datum.time === i && new Date(datum.date).getUTCDate() === day.date.getUTCDate()) {
                    found = true;
                    cells.push(<Cells key={datum._id} row={i} col={colNum} data={datum} timeStrings={timeStrings} height={cellHeight} div={divisions} addNewBlock={addNewBlock}/>)
                    if (datum.duration > divisions) {
                        i += datum.duration - divisions;
                    }
                }
            }
            if (!found) {
                cells.push(<Cells key={i} row={i} col={colNum} data={{_id: null, title: '', body: '', time: i, duration: divisions, category: null, date: day.date.getTime()}} timeStrings={timeStrings} height={cellHeight} div={divisions} addNewBlock={addNewBlock}/>)
            }
        }
        return cells;
    }

    const getWeek = () => {
        const timeInDay = 86400000;
        const dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let week = []
        const sunday = new Date(timeblockContext.week);
        for (let i = 0; i < dow.length; i++) {
            week.push({
                day: dow[i],
                date: new Date(sunday.getTime() + timeInDay * i)
            });
        }
        return week;
    }
    return (
            <div className='table-blockz'>
                <div className='table-col' name='admin'>
                    <div className="table-row admin-cell">Admin</div>
                    {timeLoop()}
                </div>
                {
                    getWeek().map((day, index) => {
                        return (
                            <div className="table-col" key={index}>
                                <div className="table-row admin-cell" style={new Date().getDay() === index ? {color: "#34b487"} : {}}>
                                    {`${day.day}`}
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
