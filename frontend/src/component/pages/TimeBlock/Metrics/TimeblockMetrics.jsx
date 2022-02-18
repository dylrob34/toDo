import React, {useState} from 'react'

const TimeblockMetrics = (props) => {
  // Test Data to mirror structure for backend - To be Used by Dylan
  const [metricsDataArray, setMetricsDataArray] = useState([])

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
    let TestCategory2 = {
      id: '1235',
      title: 'Test Title 2',
      color: {
        r: '174',
        g: '161',
        b: '255',
      },
      weekHourData: {
        Week1: 14,
        Week2: 12,
        Week3: 23,
      }
    };
    let TestCategory3 = {
      id: '1236',
      title: 'Test Title 3',
      color: {
        r: '226',
        g: '115',
        b: '0',
      },
      weekHourData: {
        Week1: 8,
        Week2: 12,
        Week3: 23,
      }
    };

  let TestCategoryArray = [ TestCategory1, TestCategory2, TestCategory3, TestCategory3];
    
  // End of Test data

    const populateMetricsData = () => {
      const metricsCategoryArray = [];
      let tempTitle = ''
      let tempColor = {}
      let tempDuration = 0
      for(const i of Object.keys(props.allUserCategories)){
        tempTitle = props.allUserCategories[i].title
        tempColor = props.allUserCategories[i].color
        for(const c of Object.keys(props.categoryDurations)){
          let compareName = props.categoryDurations[c].name
          if(compareName === tempTitle){
            tempDuration = props.categoryDurations[c].duration
          } else {
            continue
          }
        }
        metricsCategoryArray.push({
          name: tempTitle,
          color: tempColor,
          totalDuration: tempDuration
        })
      }
      console.log(metricsCategoryArray)
      return metricsCategoryArray
    }


    // for(const i of Object.keys(props.categoryDurations)){
    //   let tempName = props.categoryDurations[i].name
    //   console.log(tempName)
    //   if(tempTitle === tempName){
    //     let tempCategoryDuration = props.categoryDurations[i].duration
    //   }
    // }
    // console.log(props.allUserCategories)
    // console.log(props.categoryDurations)
  return (
    <div>
      <div className='metrics-table-container metrics-table-shrin'>
        
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

        <div className='metrics-data-table-pos'>
          <table className='metrics-data-table' style={{overflowY:"scroll"}}>
            <tr style={{fontSize:'.9rem'}}>
              <td className='metrics-data-td'> Color </td>
              <td className='metrics-data-td'> Category Name</td>
              <td className='metrics-data-td'> Hours Spent </td>
              <td className='metrics-data-td'> % of Total Time</td>
            </tr>
            {
              populateMetricsData().map((category) => {
                  return (
                      <tr style={{fontSize:'.8rem'}}>
                        <td className='metrics-data-td'>
                        <div style={{backgroundColor:`rgb(${category.color.r},${category.color.g},${category.color.b}`, border:'none'}} className='color-title-metrics metrics-title'></div>
                        </td>
                        <td className='metrics-data-td'>{category.name}</td>
                        <td className='metrics-data-td'>{category.totalDuration}</td>
                        <td className='metrics-data-td'>00 %</td>
                      </tr>
                  )
              })
            }
          </table>
        </div>


        {/* <div name='Table Column Titles' className='metrics-column-titles-container'>
          <div style={{backgroundColor:''}} className='color-title-metrics metrics-title'>
            
          </div>
          <div className='metrics-title'> Category Name </div>
          <div className='metrics-title'> Hours Spent </div>
          <div className='metrics-title'> % of Total Hours </div>
        </div>
        <div name='Populated Categories'>

        </div> */}
      </div>

    </div>
    
  )
}

export default TimeblockMetrics