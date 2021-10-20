import React, {useState} from 'react'
import Cell from './Cell';
import TimeCell from './TimeCell'; // Don't know if need a different type of cell component for the Admin col, but its late and I didnt want to think.




const TimeTable2 = () => {
    // const [divisions, setDivisions] = useState(0)
    var timerows = [];

    function timeLoop() {
        for(var i = 0; i < 39; i++) {
            timerows.push(< TimeCell key={i} />)
        }
        return <div>{timerows}</div>
    }

    // function cellLoop() {
    //     for()
    // }

    return (
        <div className='table'>
            <div className='table-col' id='admin' name='admin'>
                Admin
                {timeLoop()}
            </div>
            <div className='table-col' id='sunday'>
                Sunday
                {/* {cellLoop()} */}
            </div>
            <div className='table-col' id='monday'>
                Monday
            </div>
            <div className='table-col' id='tuesday'>
                Tuesday
            </div>
            <div className='table-col' id='wednesday'>
                Wednesday
            </div>
            <div className='table-col' id='thursday'>
                Thursday
            </div>
            <div className='table-col' id='friday'>
                Friday
            </div>
            <div className='table-col' id='saturday'>
                Saturday
            </div>
        </div>
    )
}

export default TimeTable2

// Need to make a cell react component that can be the output of a for loop when iterated over.
// The for loop logic needs to ask whether this space needs to be populated by a cell or if it need to be filled with a task.
// We need to have the option toggle how many divisions there are and this would be changed by the user defined number of incremetns that they want.

// Stack Overflow reference:
// https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
