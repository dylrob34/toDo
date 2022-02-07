import React, {useState, useEffect} from 'react'
import TimeTable2 from './Tables/TimeTable2'
import { FaPlus, FaTimes, FaFolder, FaFolderOpen, FaAngleDoubleLeft, FaAngleDoubleRight, FaRegPlusSquare } from 'react-icons/fa';
import PopupCategories from './Popup/PopupCategories';
import Modal from '../../layout/Modal/Modal';
import { getLoggedIn } from "../../../context/loggedInState";
import { get, post } from "../../../tools/request";
import { Redirect } from "react-router";
import { getCurrentWeekString, getCurrentWeek, getNextWeek, getPrevWeek, getDOWFromUTC } from '../../../tools/time';

import { PlusIcon } from '@heroicons/react/solid'
import {PieChart} from "./PieChart/PieChart";

const TimeBlock = (props) => {
    // const [popup, setPopup] = useState(false)
    const [modal, setModal] = useState(false)
    const [nestedModal, setNestedModal] = useState(false)
    const [categories, setCategories] = useState([])
    const [timeblocks, setTimeblocks] = useState({});
    const [week, setWeek] = useState(getCurrentWeek());
    const [load, setLoad] = useState(true);

    const cats = [
        {
            name: "Test",
            size: 10,
            color: [128, 128, 0]
        },
        {
            name: "Game",
            size: 30,
            color: [0, 128, 128]
        },
        {
            name: "Day Job",
            size: 60,
            color: [128, 0, 128]
        },
        {
            name: "Blockz",
            size: 180,
            color: [128, 128, 128]
        },
    ]


    useEffect(() => {
        if (load) {
            const thisWeek = getCurrentWeek();
            setTimeblocksAPI(thisWeek);
            setCategoriesAPI();
        }
    }, [load])

    if (getLoggedIn() === false) {
        return <Redirect to="/login" />;
    }

    const changeWeek = (week) => {
        setWeek(week);
        setTimeblocksAPI(week);
    }

    const setTimeblocksAPI = (week) => {
        post("/api/timeblocking/getTimeblocksWeek", {week})
        .then((res) => {
            if (res.timeblocks !== undefined) {
                setTimeblocks(res.timeblocks)
            }
        })
    }

    const editBlock = (oldData, newData, key) => {
        let temp = {...timeblocks}
        let day = getDOWFromUTC(oldData.date);
        delete temp[day][oldData.time]
        let time = oldData.time;
        if (key === "date") {
            day = getDOWFromUTC(newData.date);
        }
        if (key === "time") {
            time = newData.time;
        }
        temp = {...temp, [day]: {...temp[day], [time]: {...newData}}};
        setTimeblocks(temp);
    }

    const deleteBlock = (day, time) => {
        let temp = {...timeblocks}
        delete temp[day][time]
        setTimeblocks(temp);
    }

    const setCategoriesAPI = () => {
        get("/api/categories/getCategories")
        .then((res) => {
            if (res.categories !== undefined) {
                setCategories(res.categories);
            }
        })
    }

    const handleAddCategory = () => {
        post("/api/categories/createCategory", {
            title: "title",
            color: {
                r: "52",
                g: "180",
                b: "135"
            }
        })
        .then((res) => {
            if (res.error === false) {
                setCategories(categories.map((cat) => cat).push(res.category));
            }
        })
    }


    return (
        <div>
            <div className='toolbar-container'>
                <div className='toolbar-element' onClick={() => setModal(true)}>
                    <FaFolderOpen/>
                    <div className='toolbar-item'> Categories</div>
                </div>
                <div className='toolbar-element'>
                    <div className='toolbar-item'>Test Item 2</div>
                </div>
                <div className='toolbar-element'>
                    <div className='toolbar-item'>Calendar View</div>
                </div>
                <div className='flex-spacer-end'></div>
            </div>
            <div className='page-config'>
                <div className='left-sidebar-sm'></div>
                <div className='main' name='table_metrics'>
                    <div>
                        <FaAngleDoubleLeft onClick={() => changeWeek(getPrevWeek(week))}/>
                        <div style={{color: "white"}}> {"Week of " + week === null ? getCurrentWeekString(getCurrentWeek()) : getCurrentWeekString(week)} </div>
                        <FaAngleDoubleRight onClick={() => changeWeek(getNextWeek(week))}/>
                    </div>

                    <section className='top'>
                        <TimeTable2 timeblocks={timeblocks} setTimeBlocks={setTimeblocks} editBlock={editBlock} deleteBlock={deleteBlock} week={week} categories={categories}/>
                    </section>
                    <section className='bottom'>
                        <div className='page-element' style={{width: "100%", height: "100%"}}>
                            {/* Placeholder for Metrics component 1 */}
                            <PieChart categories={cats} width={800} height={800} font={"25px arial"}/>
                        </div>
                        <div className='page-element' style={{backgroundColor: 'green', width: "100%", height: "100%" }}>
                            {/* Placeholder for Metrics component 2 */}
                            placeholder
                        </div>
                    </section>
                </div>
            </div>

            {/* This is the Modal for the categories stuff. */}
            <Modal trigger={modal} setTrigger={setModal}>
                <div className='modal-background' onClick={() => {setModal(false)}} />
                <div className='modal'>
                        <div className='modal-container' style={{border: "none"}}>
                            <div className='modal-row' style={{padding:"0px 0px 30px 0px", justifyContent:'space-between'}}>
                                <h2 className='modal-header'>Categories</h2>
                                <div className='m-btn m-btn-sml' onClick={handleAddCategory} style={{left:"-16px"}}>
                                    <PlusIcon className='fa-sml' style={{height:'20px', width:'20px'}}></PlusIcon>
                                    {/* <img alt="Add" src="/Cross.svg" className="fa-sml" /> */}
                                </div>
                            </div>
                            <div className='modal-row modal-row-content' style={{padding:"0px 0px 0px 0px"}} >
                                <PopupCategories
                                nestedModal={nestedModal}
                                setNestedModal={setNestedModal} 
                                categories={categories} 
                                />
                            </div>
                            <div className='modal-row' style={{paddingTop:"30px", justifyContent:'center'}}>
                                <div className='m-btn m-btn-lrg' onClick={() => setModal(false)}>Close</div>
                            </div>
                        </div>
                    </div>
            </Modal>
        </div>

    )
}

export default TimeBlock
