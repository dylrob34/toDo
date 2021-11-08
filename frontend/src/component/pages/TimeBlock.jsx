import React from 'react'
import TimeTable2 from '../Tables/TimeTable2'
import { FaFolder, FaFolderOpen } from 'react-icons/fa';

const TimeBlock = () => {
    return (
        <div>
            <div className='toolbar-container'>
              <div className='toolbar-element'>
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

            <div className='left-side'>
                <TimeTable2 />
            </div>
            <div className='right-side'>
            </div>
        </div>

    )
}

export default TimeBlock
