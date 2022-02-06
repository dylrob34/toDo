import React, {useState, useEffect} from 'react'
import TimeTable2 from './Tables/TimeTable2'
import { FaPlus, FaTimes, FaFolder, FaFolderOpen, FaAngleDoubleLeft, FaAngleDoubleRight, FaRegPlusSquare } from 'react-icons/fa';
import PopupCategories from './Popup/PopupCategories';
import Modal from '../../layout/Modal/Modal';
import { getLoggedIn } from "../../../context/loggedInState";
import { useTimeBlockContext, useUpdateTimeBlockContext } from "../../../context/TimeBlockContext";
import { get, post } from "../../../tools/request";
import { Redirect } from "react-router";
import { getCurrentWeekString, getCurrentWeek, getNextWeek, getPrevWeek } from '../../../tools/time';

import { PlusIcon } from '@heroicons/react/solid'
import {PieChart} from "./PieChart/PieChart";

const TimeBlock = (props) => {
    // const [popup, setPopup] = useState(false)
    const [modal, setModal] = useState(false)
    const [nestedModal, setNestedModal] = useState(false)
    const [userCategories, setUserCategories] = useState([])
    const timeblockContext = useTimeBlockContext();
    const updateTimeBlockContext = useUpdateTimeBlockContext();

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
        if (timeblockContext.week === null)
        {
            const currentweek = getCurrentWeek();
            updateTimeBlockContext({...timeblockContext, week: currentweek, reloadTimeblocks: true})
        }
        if (timeblockContext.reloadCategories === true) {
            get("/api/categories/getCategories")
            .then((res) => {
                if (res.categories === undefined) {
                    setUserCategories([]);
                    updateTimeBlockContext({...timeblockContext, categories: [], reloadCategories: false});
                } else {
                    setUserCategories(res.categories);
                    updateTimeBlockContext({...timeblockContext, categories: res.categories, reloadCategories: false});
                }
            })
        }
    }, [timeblockContext.reloadCategories])

    if (getLoggedIn() === false) {
        return <Redirect to="/login" />;
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
                let temp = userCategories;
                temp.push(res.category);
                setUserCategories(temp);
                updateTimeBlockContext({...timeblockContext, reloadCategories: true})
            }
        })
    }

    const handleCloseAll = () => {
        setNestedModal(false)
        setModal(false)
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
                        <FaAngleDoubleLeft onClick={() => updateTimeBlockContext({...timeblockContext, week: getPrevWeek(timeblockContext.week), reloadTimeblocks: true})}/>
                        <div> {"Week of " + getCurrentWeekString(timeblockContext.week)} </div>
                        <FaAngleDoubleRight onClick={() => updateTimeBlockContext({...timeblockContext, week: getNextWeek(timeblockContext.week), reloadTimeblocks: true})}/>
                    </div>

                    <section className='top'>
                        <TimeTable2 />
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
                                categories={userCategories} 
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
