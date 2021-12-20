import React, {useState} from 'react'
import TimeTable2 from '../Tables/TimeTable2'
import { FaPlus, FaTimes, FaFolder, FaFolderOpen } from 'react-icons/fa';
import PopupCategories from '../Tables/Popup/PopupCategories';
import Modal from '../layout/Modal/Modal';

const TimeBlock = () => {
    // const [popup, setPopup] = useState(false)
    const [modal, setModal] = useState(false)
    const [nestedModal, setNestedModal] = useState(false)

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
                            <div className='toolbar-element'>
                                <FaPlus className='toolbar-item'></FaPlus>
                                <div className='toolbar-item'>New Category</div>
                            </div>
                            <div className='flex-spacer-end'></div>
                            <FaTimes className='toolbar-item hover' onClick={() => setModal(false)}></FaTimes>
                        </div>
                        <PopupCategories nestedModal={nestedModal} setNestedModal={setNestedModal}/>

                    </div>
                </div>
            </Modal>
        </div>

    )
}

export default TimeBlock
