import React, {useState} from 'react'
import Cell from './Cell';
import TimeCell from './TimeCell'; // Don't know if need a different type of cell component for the Admin col, but its late and I didnt want to think.




const TimeTable2 = () => {
    const [divisions, setDivisions] = useState(15);
    const [military, setMilitary] = useState(false);

    const data = {
        title: "Test",
        body: "something",
        dow: "Monday",
        time: 450,
        duration: 30
    }

    function timeLoop() {
        var timerows = [];
        let count = 0;
        for(var i = 0; i < 1440; i+=divisions) {
            console.log("cell: " + i);
            let hourMath = (i % 60 === 0) ? i:i-(i % 60)
            let hour = hourMath/60;
            if (!military) {
                hour = (hour > 12) ? hour - 12: (hour === 0) ? 12 : hour;
            }
            let minute = i % 60;
            minute = (minute === 0) ? "00" : minute;
            timerows.push(< TimeCell key={i} time={`${hour}:${minute}`}/>)
            count++;
        }
        return <div>{timerows}</div>
    }

    function fill(day) {
        let cells = [];
        for (let i = 0; i < 1440; i += divisions) {
            if (data.time === i && data.dow === day) {
                cells.push(<Cell key={i} data={data}/>)
                if (data.duration > divisions) {
                    i += data.duration - divisions;
                }
            } else {
                cells.push(<Blank key={i} />)
            }
        }
        return cells;
    }

    const dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <div className='table'>
            <div className='table-col' id='admin' name='admin'>
                Admin
                {timeLoop()}
            </div>
            {
                dow.map((day) => {
                    return (
                        <div className='table-col' id={day}>
                            {day}
                            {fill(day)}
                        </div>
                    )
                })
            }
        </div>
    )
}

const Blank = () => {

    return (
        <div className="table-col">
            <div className='table-row table-fill'>fill</div>
        </div>
    )
}


export default TimeTable2

// Need to make a cell react component that can be the output of a for loop when iterated over.
// The for loop logic needs to ask whether this space needs to be populated by a cell or if it need to be filled with a task.
// We need to have the option toggle how many divisions there are and this would be changed by the user defined number of incremetns that they want.

// Stack Overflow reference:
// https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
