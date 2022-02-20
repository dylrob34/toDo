import React, { useState, useEffect, useRef } from "react";
import {
  useTimeBlockContext,
  useUpdateTimeBlockContext,
} from "../../../../context/TimeBlockContext";
import { post } from "../../../../tools/request";
import Cell from "./Cell";
import TimeCell from "./TimeCell"; // Don't know if need a different type of cell component for the Admin col, but its late and I didnt want to think.
import { Dropdown, Option } from "../../../layout/Dropdown";
import { getTodayUTC, getWeekDaysUTC } from "../../../../tools/time";

let initValues = null;
let cachedValues = null;
let callback = null;
let currentCellCallback = null;
let stopCallback = null;

const TimeTable2 = (props) => {
  const [divisions, setDivisions] = useState(30);
  const [military, setMilitary] = useState(false);
  const [cellHeight, setCellHeight] = useState(0);
  const [timeStrings, setTimeStrings] = useState({});
  const [data, setData] = useState(props.timeblocks);

  useEffect(() => {
    setData(props.timeblocks);
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
  }, [divisions, props.timeblocks]);

  useEffect(() => {
    console.log("adding listener");
    document.addEventListener("click", callCellCallback)
    return () => {
      console.log("removing listener")
      document.removeEventListener("click", callCellCallback);
    }
  }, [])

  const callCellCallback = (e) => {
    if (currentCellCallback !== null) {
      currentCellCallback(e);
    }
  }

  const setCellCallback = (cb, target) => {
    callCellCallback(target)
    currentCellCallback = cb;
  }

  const clicked = (e) => {
    setDivisions(parseInt(e.target.innerHTML));
  };

  const setDraggedOverRow = (row) => {
    if (callback !== null) {
      callback(row, initValues);
    }
  }

  const setCache = (values) => {
    cachedValues = values;
  }

  const startDragging = (init, call, stopCall) => {
    initValues = init;
    callback = call;
    stopCallback = stopCall;
    document.addEventListener("mouseup", stopDragging);
  }

  const stopDragging = () => {
    document.removeEventListener("mouseup", stopDragging)
    stopCallback(cachedValues);
    stopCallback = null;
    initValues = null;
    callback = null;
  }

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
      timerows.push(
        <TimeCell
          key={i}
          time={`${hour}:${minute}`}
          row={i / divisions}
          setHeight={setCellHeight}
        />);
    }
    return timerows;
  }

  function getDaysTimeblocks(day, colNum) {
    const defaultData = {
      _id: null,
      title: "",
      body: "",
      time: 0,
      duration: divisions,
      category: null,
      date: day.date.getTime(),
    };
    let cells = [];
    let parsedData = {};
    if (data[6] !== undefined) {
      Object.keys(data[colNum]).forEach((d) => {
        parsedData = { ...parsedData, [data[colNum][d].time]: data[colNum][d] };
      });
    }
    let i = 0;
    while (i < 1440 / 15) {
      let currentData = parsedData[i * 15];
      if (currentData === undefined) {
        cells.push(
          <Cell
            key={`${colNum}${i * divisions / 15}`}
            {...props}
            row={i}
            col={colNum}
            data={{ ...defaultData, time: i * 15 }}
            timeStrings={timeStrings}
            height={cellHeight}
            divisions={divisions}
            setDraggedOverRow={setDraggedOverRow}
            startDragging={startDragging}
            stopDragging={stopDragging}
            setCellCallback={setCellCallback}
            setCache={setCache}
          />
        );
        for (let j = 1; j < divisions / 15; j++) {
          cells.push(null);
          i++;
        }
        i++;
      } else {
        cells.push(
          <Cell
            key={`${colNum}${i * divisions / 15}`}
            {...props}
            row={i}
            col={colNum}
            data={currentData}
            timeStrings={timeStrings}
            height={cellHeight}
            divisions={divisions}
            setDraggedOverRow={setDraggedOverRow}
            startDragging={startDragging}
            stopDragging={stopDragging}
            setCellCallback={setCellCallback}
            setCache={setCache}
            checkTime={props.checkTime}
          />
        );
        for (let j = 1; j < parseInt(currentData.duration) / 15; j++) {
          cells.push(null);
          i++;
        }
        if (currentData.duration % divisions !== 0) {
          cells.push(
            <Cell
              key={`${colNum}${i * divisions / 15 + currentData.duration}`}
              {...props}
              row={i}
              col={colNum}
              data={{ ...defaultData, time: i * divisions + currentData.duration, duration: 15 }}
              timeStrings={timeStrings}
              height={cellHeight}
              divisions={divisions}
              setDraggedOverRow={setDraggedOverRow}
              startDragging={startDragging}
              stopDragging={stopDragging}
              setCellCallback={setCellCallback}
              setCache={setCache}
              checkTime={props.checkTime}
            />)
        }
        i++;
      }
    }
    return cells;
  }

  const fillTable = () => {
    // get columns time cells
    let columns = [];
    getWeekDaysUTC(props.week).forEach((day, i) => {
      columns.push(getDaysTimeblocks(day, i));
    });
    // fill each row with proper cells
    let rows = [];
    const times = timeLoop();
    //timeLoop().forEach((time, i) => {
    for (let i = 0; i < 1440 / 15; i++) {
        let cells = [];
        for (let j = 0; j < columns.length; j++) {
          cells.push(columns[j][i]);
        }
        //console.log(cells);
        rows.push(
          <tr className="table-row" key={i * divisions / 15}>
            {i % (divisions/15) === 0 ? <th className={"admin-cell time-cell"} rowSpan={divisions / 15}>{times[i/(divisions/15)]}</th> : null}
            {cells.map((e) => {
              return e ?? null;
            })}
          </tr>
        );
     
    }

    return rows;
  };

  return (
    <table className="table-blockz">
      <colgroup>
        <col className="table-admin-col" />
      </colgroup>
      <thead>
        <tr className="table-row">
          <th className="table-header">Admin</th>
          {getWeekDaysUTC(props.week).map((day, i) => (
            <th
              key={i}
              className="table-header"
              style={
                day.date.getTime() === getTodayUTC() ? { color: "#34b487" } : {}
              }
            >
              {day.day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{fillTable()}</tbody>
    </table>
  );
};

/*
timeLoop().map((time) => (
              <tr className="table-row">
                <th>{time[0]}</th>
                {fillRow(time[1])}
              </tr>
            ))
            */

export default TimeTable2;
