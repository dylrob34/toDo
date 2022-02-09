import React, { useState, useEffect, useRef } from "react";
import {
  useTimeBlockContext,
  useUpdateTimeBlockContext,
} from "../../../../context/TimeBlockContext";
import { get } from "../../../../tools/request";
import Cells from "./Cells";
import TimeCell from "./TimeCell";

const timeInDay = 86400000;

const TimeTable2 = () => {
  const [military, setMilitary] = useState(false);
  const [data, setData] = useState([]);
  const [timeStrings, setTimeStrings] = useState({});
  const timeblockContext = useTimeBlockContext();
  const updateTimeblockContext = useUpdateTimeBlockContext();
  const divisions = timeblockContext.divisions;

  useEffect(() => {
    if (timeblockContext.reloadTimeblocks) {
      get("/api/timeblocking/getTimeblocks").then((res) => {
        if (res.timeblocks === undefined) {
          setData([]);
        } else {
          setData(res.timeblocks);
        }
        updateTimeblockContext({
          ...timeblockContext,
          reloadTimeblocks: false,
        });
      });
    }
    var strings = {};
    for (var i = 0; i < 1440; i += divisions) {
      let hourMath = i % 60 === 0 ? i : i - (i % 60);
      let hour = hourMath / 60;
      if (!military) {
        hour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      }
      let minute = i % 60;
      minute = minute === 0 ? "00" : minute;
      strings[i] = `${hour}:${minute}`;
    }
    setTimeStrings(strings);
  }, [divisions, timeblockContext.reloadTimeblocks]);


  function timeLoop() {
    var timerows = [];
    for (var i = 0; i < 1440; i += divisions) {
      let hourMath = i % 60 === 0 ? i : i - (i % 60);
      let hour = hourMath / 60;
      if (!military) {
        hour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      }
      let minute = i % 60;
      minute = minute === 0 ? "00" : minute;
      timerows.push({
        time: `${hour}:${minute}`,
        minutes: i,
      });
    }
    return timerows;
  }
  const getWeekDaysUTC = (theWeek) => {
    const dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let week = []
    const sunday = new Date(theWeek);
    for (let i = 0; i < dow.length; i++) {
        week.push({
            day: dow[i],
            date: new Date(sunday.getTime() + timeInDay * i)
        });
    }
    return week;
}
  return (
    <table className="table-blockz">
        <colgroup>
            <col className="table-admin-col"/>
        </colgroup>
      <thead>
        <tr className="table-row">
          <th className="table-header">Admin</th>
          {getWeekDaysUTC(timeblockContext.week).map(({ day }, i) => (
            <th key={i} className="table-header">{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeLoop().map((time, i) => (
          <tr className="table-row">
            <th className="table-header">{time.time}</th>
            
            {getWeekDaysUTC(timeblockContext.week).map((day, i) => {
              let timeblock = data.find((tb) => {
                // console.log("day", day.date)
                // console.log("tb", new Date(tb.date))
                // check if the date and the time are the same
                return (
                  day.date.getDate() === new Date(tb.date).getDate() &&
                  day.date.getMonth() === new Date(tb.date).getMonth() &&
                  day.date.getFullYear() === new Date(tb.date).getFullYear() &&
                  time.minutes === tb.time
                );
              });
              console.log("timeblock", timeblock)
              return (
                <td className="table-data" key={i} rowSpan={timeblock ? timeblock.duration / divisions : 1}>{timeblock ? "timebloc" : "cell"}</td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

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

export default TimeTable2;

// Need to make a cell react component that can be the output of a for loop when iterated over.
// The for loop logic needs to ask whether this space needs to be populated by a cell or if it need to be filled with a task.
// We need to have the option toggle how many divisions there are and this would be changed by the user defined number of incremetns that they want.

// Stack Overflow reference:
// https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
