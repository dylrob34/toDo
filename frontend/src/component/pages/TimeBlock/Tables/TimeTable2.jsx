import React, {useState, useEffect, useRef} from "react";
import { useTimeBlockContext, useUpdateTimeBlockContext } from '../../../../context/TimeBlockContext';
import { post } from "../../../../tools/request";
import Cells from './Cells';
import TimeCell from './TimeCell'; // Don't know if need a different type of cell component for the Admin col, but its late and I didnt want to think.
import { Dropdown, Option } from '../../../layout/Dropdown';
import { getTodayUTC, getWeekDaysUTC } from "../../../../tools/time";



const TimeTable2 = (props) => {
    const [divisions, setDivisions] = useState(30);
    const [military, setMilitary] = useState(false);
    const [cellHeight, setCellHeight] = useState(0);
    const heightRef = useRef(null);
    const [timeStrings, setTimeStrings] = useState({});

    useEffect(() => {
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
    }, [heightRef.current, divisions]);

    const clicked = (e) => {
        setDivisions(parseInt(e.target.innerHTML));
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
        const defaultData = {
            _id: null,
            title: '',
            body: '',
            time: 0,
            duration: divisions,
            category: null,
            date: day.date.getTime()
        }
        const data = props.timeblocks;
        let cells = [];
        let usedCellsCount = 0;
        let parsedData = {};
        if (data[6] !== undefined) {
            Object.keys(data[colNum]).forEach(d => {
                usedCellsCount += data[colNum][d].duration / divisions - 1;
                parsedData = ({...parsedData, [data[colNum][d].time]: data[colNum][d]})
            });
        }
        for (let i = 0; i < 1440 / divisions - usedCellsCount; i++) {
            let currentData = parsedData[i * divisions];
            if (currentData === undefined) {
                cells.push(<Cells key={i} {...props} row={i} col={colNum} data={{...defaultData, time: i * divisions}} timeStrings={timeStrings} height={cellHeight} divisions={divisions}/>);
            } else {
                cells.push(<Cells key={i} {...props} row={i} col={colNum} data={currentData} timeStrings={timeStrings} height={cellHeight} divisions={divisions}/>)
            }
        }
        return cells;
    }

    return (
            <div className='table-blockz'>
                <div className='table-col' name='admin'>
                        <div>
                            <Dropdown first={<div className="table-row increment-cell">Increments</div>}>
                                    <Option
                                    clicked={clicked}
                                    key={1}
                                    value={15}
                                    />
                                    <Option
                                    clicked={clicked}
                                    key={2}
                                    value={30}
                                    />
                            </Dropdown>
                        </div>
                    {timeLoop()}
                </div>
                {
                    getWeekDaysUTC(props.week).map((day, index) => {
                        return (
                            <div className="table-col" key={index}>
                                <div className="table-row admin-cell" style={day.date.getTime() === getTodayUTC() ? {color: "#34b487"} : {}}>
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

export default TimeTable2;
