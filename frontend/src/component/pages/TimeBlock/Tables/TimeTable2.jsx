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
let callback = null;

const TimeTable2 = (props) => {
  const [divisions, setDivisions] = useState(30);
  const [military, setMilitary] = useState(false);
  const [cellHeight, setCellHeight] = useState(0);
  const heightRef = useRef(null);
  const [timeStrings, setTimeStrings] = useState({});

  useEffect(() => {
    if (heightRef.current !== null) {
      //setCellHeight(heightRef.current.getBoundingClientRect().height);
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
  }, [heightRef.current, divisions]);

  const clicked = (e) => {
    setDivisions(parseInt(e.target.innerHTML));
  };

  const setDraggedOverRow = (row) => {
      if (callback !== null) {
          callback(row, initValues);
      }
  }

  const startDragging = (init, call) => {
      initValues = init;
      callback = call;
      document.addEventListener("mouseup", stopDragging);
  }

  const stopDragging = () => {
      document.removeEventListener("mouseup", stopDragging)
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
      timerows.push([
        <TimeCell
          key={i}
          time={`${hour}:${minute}`}
          row={i / divisions}
          setHeight={setCellHeight}
        />,
        i,
      ]);
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
    const data = props.timeblocks;
    let cells = [];
    let usedCellsCount = 0;
    let parsedData = {};
    if (data[6] !== undefined) {
      Object.keys(data[colNum]).forEach((d) => {
        usedCellsCount += data[colNum][d].duration / divisions - 1;
        parsedData = { ...parsedData, [data[colNum][d].time]: data[colNum][d] };
      });
    }
    let i = 0;
    while (i < 1440 / divisions) {
      let currentData = parsedData[i * divisions];
      if (currentData === undefined) {
        cells.push(
          <Cell
            key={colNum}
            {...props}
            row={i * divisions / 15}
            col={colNum}
            data={{ ...defaultData, time: i * divisions }}
            timeStrings={timeStrings}
            height={cellHeight}
            divisions={divisions}
            setDraggedOverRow={setDraggedOverRow}
            stopDragging={stopDragging}
          />
        );
        i++;
      } else {
        cells.push(
          <Cell
            key={colNum}
            {...props}
            row={i * divisions / 15}
            col={colNum}
            data={currentData}
            timeStrings={timeStrings}
            height={cellHeight}
            divisions={divisions}
            setDraggedOverRow={setDraggedOverRow}
            startDragging={startDragging}
            stopDragging={stopDragging}
          />
        );
        //if (parseInt(currentData.duration) > divisions) {
        for (let j = 1; j < parseInt(currentData.duration) / divisions; j++) {
          console.log("pushing null");
          cells.push(null);
          i++;
        }
        //}
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
    timeLoop().forEach((time, i) => {
      let cells = [];
      for (let j = 0; j < columns.length; j++) {
        cells.push(columns[j][i]);
      }

      rows.push(
        <tr className="table-row">
          <th>{time[0]}</th>
          {cells.map((e) => {
            return e ?? null;
          })}
        </tr>
      );
    });

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
