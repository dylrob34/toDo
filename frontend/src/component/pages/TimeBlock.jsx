import React, {useState} from 'react'
import TimeTable2 from '../Tables/TimeTable2'
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import PopupCategories from '../Tables/Popup/PopupCategories';
import Popup from '../layout/Popup';
import Modal from '../layout/Modal/Modal';
import NestedModal from '../layout/Modal/NestedModal';
import { CirclePicker } from 'react-color';

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
                <div className='left-sidebar'></div>
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
            <Modal trigger={modal} setTrigger={setModal}>
                <div className='modal-background'>
                    <div className='modal'>
                        <PopupCategories nestedModal={nestedModal} setNestedModal={setNestedModal}/>
                        <button onClick={() => setModal(false)}>Close</button>
                    </div>
                    <div className={nestedModal ? 'nested-modal-background' : 'invisible'}>
                        <div className={nestedModal ? 'nested-modal-timeblock visible' : 'invisible'}>
                                <NestedModal trigger={nestedModal} setTrigger={setNestedModal}>
                                        <CirclePicker/>
                                        <button onClick={() => setNestedModal(false)}>Close</button>
                                        <button onClick={() => handleCloseAll()}>Close All</button>
                                </NestedModal>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>

    )
}

export default TimeBlock
