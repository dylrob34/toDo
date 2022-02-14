import React from 'react'

const TimeblockMetrics = () => {
  return (
    <div>TimeblockMetrics

      <div className='metrics-table-container'>
        
        <h2 name='Title' className='metrics-header'>
          Timeblock Weekly Metrics
        </h2>

        <div name='Total-Metrics' className='metrics-totals'>
          
          <div name='Total Hours Border' className='metrics-totals-border'>
              <div name='Total Hours' style={{paddingRight: '5px'}}>
              Total Hours: 
              </div>
              <div name='Total Hour numerical'>
              000 {/* Replace this with dynamic numebrs*/ }
              </div>
          </div>

          <div name='Free Hours Border' className='metrics-totals-border'>
              <div name='Free Hours' style={{paddingRight: '5px'}}>
              Free Hours: 
              </div>
              <div name='Free Hour numerical'>
              000 {/* Replace this with dynamic numebrs*/ }
              </div>
          </div>

          <div name='Used Hours Border' className='metrics-totals-border'>
              <div name='Used Hours' style={{paddingRight: '5px'}}>
              Used Hours: 
              </div>
              <div name='Used Hour numerical'>
              000 {/* Replace this with dynamic numebrs*/ }
              </div>
          </div>
          
        </div>
        <div name='Table Column Titles' className='metrics-column-titles-container'>
          <div style={{backgroundColor:''}} className='color-title-metrics metrics-title'>
            
          </div>
          <div className='metrics-title'> Category Name </div>
          <div className='metrics-title'> Hours Spent </div>
          <div className='metrics-title'> % of Total Hours </div>
        </div>
        <div name='Populated Categories'>

        </div>
      </div>

    </div>
    
  )
}

export default TimeblockMetrics