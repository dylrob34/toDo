import React, {useState, useEffect} from 'react'
import TimeTable2 from '../Tables/TimeTable2'
import { FaPlus, FaTimes, FaFolder, FaFolderOpen } from 'react-icons/fa';
import PopupCategories from '../Tables/Popup/PopupCategories';
import Modal from '../layout/Modal/Modal';
import { getLoggedIn } from "../../context/loggedInState";
import { useTimeBlockContext, useUpdateTimeBlockContext } from '../../context/TimeBlockContext';
import { get, post } from "../../tools/request";
import { Redirect } from "react-router";

const TimeBlock = (props) => {
    // const [popup, setPopup] = useState(false)
    const [modal, setModal] = useState(false)
    const [nestedModal, setNestedModal] = useState(false)
    const [userCategories, setUserCategories] = useState([])
    const timeblockContext = useTimeBlockContext();
    const updateTimeBlockContext = useUpdateTimeBlockContext();

    useEffect(() => {
        if (timeblockContext.reloadCategories === true) {
            get("/api/categories/getCategories")
            .then((res) => {
                console.log("cats")
                console.log(res.categories)
                if (res.categories === undefined) {
                    setUserCategories([]);
                } else {
                    setUserCategories(res.categories);
                }
                updateTimeBlockContext({...timeblockContext, reloadCategories: false});
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
                    <div className='toolbar-item'>Test Item 3</div>
                </div>
                <div className='flex-spacer-end'></div>
            </div>
            <div className='page-config'>
                <div className='left-sidebar-sm'></div>
                <div className='main' name='table_metrics'>
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
                <div className='modal-background'>
                    <div className='modal'>
                        <div className='toolbar-container' style={{border: "none"}}>
                            <div className='toolbar-element' onClick={handleAddCategory}>
                                <FaPlus className='toolbar-item'></FaPlus>
                                <div className='toolbar-item'>New Category</div>
                            </div>
                            <div className='flex-spacer-end'></div>
                            <FaTimes className='toolbar-item hover' onClick={() => setModal(false)}></FaTimes>
                        </div>
                        <PopupCategories nestedModal={nestedModal} 
                        setNestedModal={setNestedModal} 
                        categories={userCategories} 
                        />
                    </div>
                </div>
            </Modal>
        </div>

    )
}

export default TimeBlock
