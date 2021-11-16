import React, {useState} from 'react'
import TimeTable2 from '../Tables/TimeTable2'
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import PopupCategories from '../Tables/Popup/PopupCategories';
import Popup from '../layout/Popup';

const TimeBlock = () => {
    const [popup, setPopup] = useState(false)
    return (
        <div>
            <div className='toolbar-container'>
                <div className='toolbar-element' onClick={() => setPopup(true)}>
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
            <Popup trigger={popup} setTrigger={setPopup} >
                <PopupCategories popup={popup} setPopup={setPopup} />
            </Popup>
        </div>

    )
}

export default TimeBlock
