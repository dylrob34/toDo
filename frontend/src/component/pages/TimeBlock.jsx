import React, {useState, useEffect} from 'react'
import TimeTable2 from '../Tables/TimeTable2'
import { FaPlus, FaTimes, FaFolder, FaFolderOpen } from 'react-icons/fa';
import PopupCategories from '../Tables/Popup/PopupCategories';
import Modal from '../layout/Modal/Modal';

const TimeBlock = () => {
    // const [popup, setPopup] = useState(false)
    const [modal, setModal] = useState(false)
    const [nestedModal, setNestedModal] = useState(false)
    const [userCategories, setUserCategories] = useState([])

    useEffect(() => {
        setUserCategories([
            {
            id: 0,
            title: "Category 1",
            color: {
                r: '52',
                g: '180',
                b: '135',
                a: '1',
                }
            }
        ])
        return () => {

        }
    }, [])

    const handleAddCategory = () => {
        setUserCategories([...userCategories, {id: userCategories[userCategories.length - 1 ].id + 1, title: '', color:{r:'52', g:'180', b:'135', a:'1'}}])
    }

    const handleDeleteCategory = (id) => {
        let temp = []
        for(const c of userCategories) {
            if (c.id !== id) {
                temp.push(c)
            }
        }
        setUserCategories(temp)
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
                        onDelete={handleDeleteCategory}
                        />
                    </div>
                </div>
            </Modal>
        </div>

    )
}

export default TimeBlock
