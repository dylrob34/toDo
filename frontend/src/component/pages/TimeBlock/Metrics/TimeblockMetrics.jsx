import React, {useEffect, useState} from 'react'

const TimeblockMetrics = (props) => {
  const [categories, setCategories] = useState(props.categoryDurations);
  let dynamicTime = MetricsDynamicTime()
  useEffect(() => {
    setCategories(props.categoryDurations);
  }, [props.categoryDurations, dynamicTime]);

  
    let TestCategory1 = {
      id: '1234',
      title: 'Test Title 1',
      color: {
        r: '52',
        g: '180',
        b: '135',
      },
      weekHourData: {
        Week1: 10,
        Week2: 12,
        Week3: 23,
      }
    };

    
  // End of Test data
    function MetricsDynamicTime() {
      let dataArray = props.categoryDurations;
      let category;
      let totalUsedTime = 0
      for(category of dataArray){
        totalUsedTime = totalUsedTime + category.duration
      }
      totalUsedTime = totalUsedTime/60
      return totalUsedTime
    }

  return (
    <div>
      <div className='metrics-table-container metrics-table-shrink'>
        
        <h2 name='Title' className='metrics-header'>
          Timeblock Weekly Metrics
        </h2>
        <div name='Total-Metrics' className='metrics-totals'>
          
          <div name='Total Hours Border' className='metrics-totals-border'>
              <div name='Total Hours' style={{paddingRight: '5px'}}>
              Total Hours: 
              </div>
              <div name='Total Hour numerical'>
              {168} {/* Replace this with dynamic numebrs*/ }
              </div>
          </div>

          <div name='Free Hours Border' className='metrics-totals-border'>
              <div name='Free Hours' style={{paddingRight: '5px'}}>
              Free Hours: 
              </div>
              <div name='Free Hour numerical'>
              {168 - MetricsDynamicTime()} {/* Replace this with dynamic numebrs*/ }
              </div>
          </div>

          <div name='Used Hours Border' className='metrics-totals-border'>
              <div name='Used Hours' style={{paddingRight: '5px'}}>
              Used Hours: 
              </div>
              <div name='Used Hour numerical'>
              {MetricsDynamicTime()} {/* Replace this with dynamic numebrs*/ }
              </div>
          </div>
          
        </div>

        <div className='metrics-data-table-pos'>
          <table className='metrics-data-table'>
            <tr style={{fontSize:'.9rem'}}>
              <td className='metrics-data-td'> Color </td>
              <td className='metrics-data-td'> Category Name</td>
              <td className='metrics-data-td'> Hours Spent </td>
              <td className='metrics-data-td'> % of Total Time</td>
            </tr>
            {
              categories.sort((a, b) => b.duration-a.duration).map((category) => {
                  return (
                      <tr style={{fontSize:'.8rem'}}>
                        <td className='metrics-data-td'>
                        <div style={{backgroundColor:`rgb(${category.color.r},${category.color.g},${category.color.b}`, border:'none'}} className='color-title-metrics metrics-title'></div>
                        </td>
                        <td className='metrics-data-td'>{category.name}</td>
                        <td className='metrics-data-td'>{category.duration/60}</td>
                        <td className='metrics-data-td'>{`${Math.round(category.duration/(1440*7)*100)}%`}</td>
                      </tr>
                  )
              })
            }
          </table>
        </div>
      </div>
    </div>
    
  )
}

export default TimeblockMetrics