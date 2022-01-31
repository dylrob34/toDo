import React, {useState, useEffect} from 'react'
import { useTimeBlockContext } from '../../../../context/TimeBlockContext';
import { getWeekDaysUTC } from "../../../../tools/time";



const PopupEditBlock = (props) => {
    const [categories, setCategories] = useState([]);
    const timeBlockContext = useTimeBlockContext();
    const divisions = timeBlockContext.divisions;

    useEffect(() => {
        setCategories(timeBlockContext.categories);
    }, [timeBlockContext.categories])

    const getTimes = () => {
        let temp = []
        for (const key of Object.keys(props.timeStrings)) {
            temp.push([key, props.timeStrings[key]]);
        }
        return temp;
    }

    const getCategories = () => {
        let temp = [];
        for (const cat of categories) {
            temp.push(cat);
        }
        temp.push({
            _id: 0,
            title: "None"
        })
        return temp;
    }

    const getDurations = () => {
        let temp = [];
        let inc = 0;
        for (let i = 0; i < 24; i++ ) {
            inc = inc + divisions
            temp.push([inc, `${parseInt(inc/60) === 0 ? '0:' : parseInt(inc/60) + ':'}${inc % 60 === 0 ? '00': inc % 60  }`])
        }
        return temp
    }

    return (
    <div>
        <div className='popup-timeblock-container'>
            <div className='popup-timeblock-relative'>
                <div className="popup-timeblock-arrow"/>
                {
                    props.cell ? 
                    <input className='popup-timeblock-text' type="text" default="Title..." onChange={(e) => props.save("title", e.target.value)} value={props.data.title}/>
                    :
                    <input className='popup-timeblock-text' autoFocus type="text" default="Title..." onChange={(e) => props.save("title", e.target.value)} value={props.data.title}/>
                }
                <input className='popup-timeblock-text' type="text" default="Body..." onChange={(e) => props.save("body", e.target.value)} value={props.data.body}/>
                <select className='popup-timeblock-text' type="text" default="Date..." onChange={(e) => props.save("date", parseInt(e.target.value))} value={new Date(props.data.date).getTime()}>
                    {
                        getWeekDaysUTC(timeBlockContext.week).map((day) => {
                            return <option key={day.day} value={day.date}>{day.day}</option>
                        })
                    }
                </select>
                <select className='popup-timeblock-text' default="Time..." onChange={(e) => props.save("time", parseInt(e.target.value))} value={props.data.time}> 
                    {
                        getTimes().map((time) => {
                            return <option key={time[0]} value={time[0]}>{time[1]}</option>
                        })
                    }
                </select>
                <select className='popup-timeblock-text' type="text" default="Duration..." onChange={(e) => props.save("duration", parseInt(e.target.value))} value={props.data.duration}>
                    {
                        getDurations().map((durationArray) => {
                            return <option key={durationArray[0]} value={durationArray[0]}>{durationArray[1]}</option>
                        })
                    }
                </select>
                <select className='popup-timeblock-text' value={props.data.category || 0} onChange={(e) => props.save("category", e.target.value)} >
                    {
                        getCategories().map((category) => {
                            return <option key={category._id} value={category._id}>{category.title}</option>
                        })
                    }
                </select>
                <button className="popup-timeblock-text" onClick={props.deleteCell}>Delete</button>
        </div>    
        </div>
    </div>
    );
}

export default PopupEditBlock
{/* <img src="TimeBlock_Popover.svg" alt="Error..." className="popup-timeblock-bckgrnd" style={props.s}/> */}
