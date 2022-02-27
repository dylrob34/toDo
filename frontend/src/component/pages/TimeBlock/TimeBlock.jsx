import React, { useState, useEffect } from "react";
import TimeTable2 from "./Tables/TimeTable2";
import TimeblockMetrics from "./Metrics/TimeblockMetrics";
import {
  FaPlus,
  FaTimes,
  FaFolder,
  FaFolderOpen,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaRegPlusSquare,
} from "react-icons/fa";
import PopupCategories from "./Popup/PopupCategories";
import Modal from "../../layout/Modal/Modal";
import { getLoggedIn } from "../../../context/loggedInState";
import { get, post } from "../../../tools/request";
import { Redirect } from "react-router";
import {
  getCurrentWeekString,
  getCurrentWeek,
  getNextWeek,
  getPrevWeek,
  getDOWFromUTC,
} from "../../../tools/time";

import { 
  PlusIcon,
  FolderOpenIcon,
  PhotographIcon,
  ChartPieIcon,
  CogIcon,

} from "@heroicons/react/outline";
 import { PieChart } from "./PieChart/PieChart";

const TimeBlock = (props) => {
  // const [popup, setPopup] = useState(false)
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [timeblocks, setTimeblocks] = useState({});
  const [week, setWeek] = useState(getCurrentWeek());
  const [load, setLoad] = useState(true);
  const [toolbarCategories, setToolbarCategories] = useState(false)
  const [toolbarViews, setToolbarViews] = useState(false)
  const [toolbarInsights, setToolbarInsights] = useState(false)
  const [toolbarSettings, setToolbarSettings] = useState(false)
  const [delayHandler, setDelayHandler] = useState(null)


  const cats = [
    {
      name: "Test",
      size: 10,
      color: [128, 128, 0],
    },
    {
      name: "Game",
      size: 30,
      color: [0, 128, 128],
    },
    {
      name: "Day Job",
      size: 60,
      color: [128, 0, 128],
    },
    {
      name: "Blockz",
      size: 180,
      color: [128, 128, 128],
    },
  ];

  const catsTest = [
    {
      name: "toDo",
      size: 8,
      color: [52, 180, 135],
    },
  ];

  useEffect(() => {
    if (load) {
      const thisWeek = getCurrentWeek();
      setTimeblocksAPI(thisWeek);
      setCategoriesAPI();
      setLoad(false);
    }
  }, [load]);

  if (getLoggedIn() === false) {
    return <Redirect to="/login" />;
  }

  const changeWeek = (week) => {
    setWeek(week);
    setTimeblocksAPI(week);
  };

  const setTimeblocksAPI = (week) => {
    post("/api/timeblocking/getTimeblocksWeek", { week }).then((res) => {
      if (res.timeblocks !== undefined) {
        setTimeblocks(res.timeblocks);
      }
    });
  };

  const checkTime = (newData) => {
    // check if new time/duration conflicts with exists timeblock
    const start = newData.time;
    const end = newData.time + newData.duration;
    for (const tbKey of Object.keys(timeblocks[getDOWFromUTC(newData.date)])) {
      const tb = timeblocks[getDOWFromUTC(newData.date)][tbKey];
      if (newData._id === tb._id) continue;
      const s = tb.time;
      const e = tb.time + tb.duration;
      // if (start < s && s < end) alert("case 1");
      // if (start < e && e < end) alert("case 2");
      // if (s < start && start < e) alert("case 3");
      // if (s < end && end < e) alert("case 4");
      if ((start < s && s < end) || (start < e && e < end) || (s < start && start < e) || (s < end && end < e)) {
        //alert("Error: That time is already being used")
        return false;
      }
    }
    return true;
  }

  const editBlock = (oldData, newData, key) => {
    let temp = { ...timeblocks };
    let time = oldData.time;
    let day = getDOWFromUTC(oldData.date);
    if (key !== "date" && key !== "duration" && key !== "time") {
      timeblocks[day] = {...timeblocks[day], [time]: {...newData}}
      return;
    }
    delete temp[day][time];
    if (key === "date") {
      day = getDOWFromUTC(newData.date);
    }
    if (key === "time") {
      time = newData.time;
    }
    temp = { ...temp, [day]: { ...temp[day], [time]: { ...newData } } };
    setTimeblocks(temp);
  };

  const deleteBlock = (day, time) => {
    let temp = { ...timeblocks };
    delete temp[day][time];
    setTimeblocks(temp);
  };

  const setCategoriesAPI = () => {
    get("/api/categories/getCategories").then((res) => {
      if (res.categories !== undefined) {
        console.log(res.categories);
        setCategories(res.categories);
      }
    });
  };

  const handleAddCategory = () => {
    post("/api/categories/createCategory", {
      title: "title",
      color: {
        r: "52",
        g: "180",
        b: "135",
      },
    }).then((res) => {
      setLoad(true);
    });
  };

  const buildPieDate = () => {
    const totalDuration = 1440 * 7;
    let slices = [];
    let cats = {};
    // create json object of categories and their total time in the week
    for (const week of Object.keys(timeblocks)) {
      for (const timeblock of Object.keys(timeblocks[week])) {
        let tempBlock = timeblocks[week][timeblock];
        let tempCatId = tempBlock.category;
        if (tempCatId !== null) {
          let tempCat = categories.find((e) => e._id === tempCatId);
          if (tempCat === undefined) continue;
          if (cats[tempCat.title] === undefined) {
            cats[tempCat.title] = {
              color: tempCat.color,
              duration: tempBlock.duration,
            };
          } else {
            cats[tempCat.title] = {
              ...cats[tempCat.title],
              duration: cats[tempCat.title].duration + tempBlock.duration,
            };
          }
        }
      }
    }
    // create array of objects to input to the pie chart
    for (const category of Object.keys(cats)) {
      let duration = cats[category].duration;
      let color = cats[category].color;
      slices.push({
        name: category,
        size: Math.round((duration / (1440 * 7)) * 360),
        color: [
          parseInt(color["r"]),
          parseInt(color["g"]),
          parseInt(color["b"]),
        ],
      });
    }
    return slices;
  };

  const countCategoryHours = () => {
    let categoriesWeeklyDurations = [];
    let cats = {};
    // create json object of categories and their total time in the week
    for (const day of Object.keys(timeblocks)) {
      for (const timeblock of Object.keys(timeblocks[day])) {
        let tempBlock = timeblocks[day][timeblock]; // pull out specific blocks that have data
        let tempCatId = tempBlock.category; // identify the category from those blocks with data
        if (tempCatId !== null) {
          let tempCat = categories.find((e) => e._id === tempCatId); //assigns the tempCat if the id is not null
          if (tempCat === undefined) continue;
          // creating an object based on the categories that are present on the week and their corresponding total duration
          if (cats[tempCat.title] === undefined) {
            cats[tempCat.title] = {
              color: tempCat.color,
              duration: tempBlock.duration,
            };
          } else {
            cats[tempCat.title] = {
              ...cats[tempCat.title],
              duration: cats[tempCat.title].duration + tempBlock.duration,
            };
          }
        }
      }
    }
  
    for (const category of categories) {
      const temp = cats[category.title];
      let duration = temp === undefined ? 0 : temp.duration;
      let color = category.color;
      categoriesWeeklyDurations.push({
        name: category.title,
        duration: Math.round((duration)),
        color
      });
    }
    return categoriesWeeklyDurations;
  };

  return (
    <div>
      <div className="page-config" style={ modal ? {overflowY:'hidden'} : {}}>
        <div className="left-sidebar-sm-tb">
            <div className="toolbar-element-tb" onClick={() => setModal(true)} onMouseEnter={() => setToolbarCategories(true)} onMouseLeave={() => setToolbarCategories(false)}>
              <FolderOpenIcon className="toolbar-item-tb" style={toolbarCategories ? {transform:'translateX(.125rem)'} : {}}/>
              <div className={"toolbar-item-title-tb"} style={toolbarCategories ? {} : {color:"transparent", left:"5.1rem"}}>Categories</div>
            </div>
            <div className="toolbar-element-tb" onMouseEnter={() => setToolbarViews(true)} onMouseLeave={() => setToolbarViews(false)}>
              <PhotographIcon className="toolbar-item-tb" style={toolbarViews ? {transform:'translateX(.125rem)'} : {}}/>
              <div className="toolbar-item-title-tb" style={toolbarViews ? {} : {color:"transparent", left:"5.1rem"}} >Views</div>
            </div>
            <div className="toolbar-element-tb" onMouseEnter={() => setToolbarInsights(true)} onMouseLeave={() => setToolbarInsights(false)} >
              <ChartPieIcon className="toolbar-item-tb" style={toolbarInsights ? {transform:'translateX(.125rem)'} : {}}/>
              <div className="toolbar-item-title-tb" style={toolbarInsights ? {} : {color:"transparent", left:"5.1rem"}}>Insights</div>
            </div>
            <div className="toolbar-element-tb" onMouseEnter={() => setToolbarSettings(true)} onMouseLeave={() => setToolbarSettings(false)}>
              <CogIcon className="toolbar-item-tb" style={toolbarSettings ? {transform:'translateX(.125rem)'} : {}}/>
              <div className="toolbar-item-title-tb" style={toolbarSettings ? {} : {color:"transparent", left:"5.1rem"}}>Settings</div>
            </div>
        </div>
        <div className="main" name="table_metrics">
          <div name='leftright-position' className="main2">
            <section className="right">
            <div className="current-week">
            Week of{" "}
            {week === null
              ? getCurrentWeekString(getCurrentWeek())
              : getCurrentWeekString(week)}{" "}
          </div>
          <div className="table-navigator">
            <button
              className="table-nav-btn"
              onClick={() => changeWeek(getPrevWeek(week))}
            >
              <FaAngleDoubleLeft />
            </button>
            <div
              className="table-nav-today"
              onClick={() => changeWeek(getCurrentWeek())}
            >
              Today
            </div>
            <button
              className="table-nav-btn"
              onClick={() => changeWeek(getNextWeek(week))}
            >
              <FaAngleDoubleRight />
            </button>
          </div>
              <TimeTable2
                timeblocks={timeblocks}
                setTimeBlocks={setTimeblocks}
                Today
                editBlock={editBlock}
                deleteBlock={deleteBlock}
                week={week}
                categories={categories}
                checkTime={checkTime}
              />
            </section>
            <section>
              <TimeblockMetrics
                // allUserCategories={categories}
                categoryDurations={countCategoryHours()}

                />
                <div className="piechart-container metrics-table-shrink">
                  {<PieChart
                      categories={buildPieDate()}
                      width={800}
                      height={800}
                      font={"25px arial"}
                  />}
                </div>
            </section>

          </div>
        </div>
      </div>

      {/* This is the Modal for the categories stuff. */}
      <Modal trigger={modal} setTrigger={setModal}>
        <div
          className="modal-background-cats"
          onClick={() => {
            setModal(false);
          }}
        />
        <div className="modal-cats">
          <div className="modal-container-cats">
            <div
                className="modal-row-cats"
                style={{
                  padding: "0px 0px 30px 0px",
                  justifyContent: "space-between",
                }}
              >
                <h2 className="modal-header-cats">Categories</h2>
                <div
                  className="m-btn m-btn-sml"
                  onClick={handleAddCategory}
                  style={{ left: "-16px" }}
                >
                  <PlusIcon
                    className="fa-sml"
                    style={{ height: "20px", width: "20px" }}
                  ></PlusIcon>
                  {/* <img alt="Add" src="/Cross.svg" className="fa-sml" /> */}
                </div>
              </div>
                <PopupCategories
                  nestedModal={nestedModal}
                  setNestedModal={setNestedModal}
                  categories={categories}
                  setLoad={setLoad}
                />
              <div
                className="modal-row-cats"
                style={{ paddingTop: "30px", justifyContent: "center" }}
              >
                <div className="m-btn m-btn-lrg" onClick={() => setModal(false)}>
                  Close
                </div>
              </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TimeBlock;
