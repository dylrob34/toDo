import React, {useState, useEffect} from 'react'
import TimeTable2 from './Tables/TimeTable2'
import { FaPlus, FaTimes, FaFolder, FaFolderOpen, FaAngleDoubleLeft, FaAngleDoubleRight, FaRegPlusSquare } from 'react-icons/fa';
import PopupCategories from './Popup/PopupCategories';
import Modal from '../../layout/Modal/Modal';
import { getLoggedIn } from "../../../context/loggedInState";
import { useTimeBlockContext, useUpdateTimeBlockContext } from "../../../context/TimeBlockContext";
import { get, post } from "../../../tools/request";
import { Redirect } from "react-router";

import { PlusIcon } from '@heroicons/react/solid'

const TimeBlock = (props) => {
    // const [popup, setPopup] = useState(false)
    const [modal, setModal] = useState(false)
    const [nestedModal, setNestedModal] = useState(false)
    const [userCategories, setUserCategories] = useState([])
    const timeblockContext = useTimeBlockContext();
    const updateTimeBlockContext = useUpdateTimeBlockContext();

    
    const timeInDay = 86400000

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

    
    const getCurrentWeek = () => {
        const now = new Date();
        const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
        const sunday = new Date(today.getTime() - timeInDay * today.getUTCDay());
        return sunday.getTime();
    }

    const getNextWeek = () => {
        const currentSunday = new Date(timeblockContext.week);
        return new Date(currentSunday.getTime() + timeInDay * 7).getTime();
    }

    const getPrevWeek = () => {
        const currentSunday = new Date(timeblockContext.week);
        return new Date(currentSunday.getTime() - timeInDay * 7).getTime();
    }

    const handleCurrentWeek = () => {
        const day = new Date(timeblockContext.week).getUTCDate();
        const month = new Date(timeblockContext.week).getUTCMonth() + 1; // Need to add 1 because Jan = 0 in JS.
        const year = new Date(timeblockContext.week).getUTCFullYear();
        const returnDate = month + "/" + day + "/" + year;
        return returnDate
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
                    <FaAngleDoubleLeft onClick={() => updateTimeBlockContext({...timeblockContext, week: getPrevWeek(), reloadTimeblocks: true})}/>
                    <div> {"Week of " + handleCurrentWeek()} </div>
                    <FaAngleDoubleRight onClick={() => updateTimeBlockContext({...timeblockContext, week: getNextWeek(), reloadTimeblocks: true})}/>
                    <section className='top'>
                        <TimeTable2 />
                    </section>
                    <section className='bottom'>
                        <div className='page-element' style={{backgroundColor: "red", width: "100%", height: "100%"}}>
                            {/* Placeholder for Metrics component 1 */}
                            placeholder
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
                                    <PlusIcon className='fa-sml' onClick={handleAddCategory} style={{height:'20px', width:'20px'}}></PlusIcon>
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
