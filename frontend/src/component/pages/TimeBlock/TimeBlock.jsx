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
// import { PieChart } from "./PieChart/PieChart";

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

  const editBlock = (oldData, newData, key, value) => {
    if (key !== "date" && key !== "duration" && key !== "time" && key!== "category") return;
    let temp = { ...timeblocks };
    let day = getDOWFromUTC(oldData.date);
    delete temp[day][oldData.time];
    let time = oldData.time;
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



  return (
    <div>
      <div className="page-config">
        <div className="left-sidebar-sm">
            <div className="toolbar-element" onClick={() => setModal(true)} onMouseEnter={() => setToolbarCategories(true)} onMouseLeave={() => setToolbarCategories(false)}>
              <FolderOpenIcon className="toolbar-item" style={toolbarCategories ? {transform:'translateX(.125rem)'} : {}}/>
              <div className={"toolbar-item-title"} style={toolbarCategories ? {} : {color:"transparent", left:"5rem"}}>Categories</div>
            </div>
            <div className="toolbar-element" onMouseEnter={() => setToolbarViews(true)} onMouseLeave={() => setToolbarViews(false)}>
              <PhotographIcon className="toolbar-item" style={toolbarViews ? {transform:'translateX(.125rem)'} : {}}/>
              <div className="toolbar-item-title" style={toolbarViews ? {} : {color:"transparent", left:"5rem"}} >Views</div>
            </div>
            <div className="toolbar-element" onMouseEnter={() => setToolbarInsights(true)} onMouseLeave={() => setToolbarInsights(false)} >
              <ChartPieIcon className="toolbar-item" style={toolbarInsights ? {transform:'translateX(.125rem)'} : {}}/>
              <div className="toolbar-item-title" style={toolbarInsights ? {} : {color:"transparent", left:"5rem"}}>Insights</div>
            </div>
            <div className="toolbar-element" onMouseEnter={() => setToolbarSettings(true)} onMouseLeave={() => setToolbarSettings(false)}>
              <CogIcon className="toolbar-item" style={toolbarSettings ? {transform:'translateX(.125rem)'} : {}}/>
              <div className="toolbar-item-title" style={toolbarSettings ? {} : {color:"transparent", left:"5rem"}}>Settings</div>
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
              />
              {/* <PieChart
                  categories={buildPieDate()}
                  width={800}
                  height={800}
                  font={"25px arial"}
              /> */}
            </section>
            <section className="left">
              <TimeblockMetrics/>
              {/* Placeholder for the Piechart (replace component with this comment) */}
            </section>
          </div>
        </div>
      </div>

      {/* This is the Modal for the categories stuff. */}
      <Modal trigger={modal} setTrigger={setModal}>
        <div
          className="modal-background"
          onClick={() => {
            setModal(false);
          }}
        />
        <div className="modal">
          <div className="modal-container" style={{ border: "none" }}>
            <div
              className="modal-row"
              style={{
                padding: "0px 0px 30px 0px",
                justifyContent: "space-between",
              }}
            >
              <h2 className="modal-header">Categories</h2>
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
            <div
              className="modal-row modal-row-content"
              style={{ padding: "0px 0px 0px 0px" }}
            >
              <PopupCategories
                nestedModal={nestedModal}
                setNestedModal={setNestedModal}
                categories={categories}
                setLoad={setLoad}
              />
            </div>
            <div
              className="modal-row"
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
