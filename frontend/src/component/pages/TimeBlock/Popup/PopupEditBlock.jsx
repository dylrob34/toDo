import React, {useState, useEffect} from 'react'
import { useTimeBlockContext } from '../../../../context/TimeBlockContext';
import { getWeekDaysUTC } from "../../../../tools/time";



const PopupEditBlock = (props) => {
    const [title, setTitle] = useState(props.data.title);
    const [body, setBody] = useState(props.data.body);
    const [time, setTime] = useState(props.data.time);
    const [duration, setDuration] = useState(props.data.duration);
    const [category, setCategory] = useState(props.data.category);
    const [date, setDate] = useState(props.data.date);
    const [categories, setCategories] = useState(props.categories);

    useEffect(() => {
        setTitle(props.data.title);
        setBody(props.data.body);
        setTime(props.data.time);
        setDuration(props.data.duration);
        setCategory(props.data.category);
        setDate(props.data.date);
        setCategories(props.categories);
    }, [props.data, props.categories])

    const getTimes = () => {
        let temp = []
        for (const key of Object.keys(props.timeStrings)) {
            temp.push([key, props.timeStrings[key]]);
        }
        return temp;
    }

    const getCategories = () => {
        let temp = [];
        for (const cat of props.categories) {
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
        for (let i = 0; i < 24 * 60 / 15; i++ ) {
            inc = i * 15
            temp.push([inc, `${parseInt(inc/60) === 0 ? '0.' : parseInt(inc/60) + '.'}${inc % 60 === 0 ? 0 : (inc % 60) / 60 * 100}`])
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
                    <input className='popup-timeblock-text' type="text" default="Title..." onChange={(e) => props.save("title", e.target.value)} value={title}/>
                    :
                    <input className='popup-timeblock-text' autoFocus type="text" default="Title..." onChange={(e) => props.save("title", e.target.value)} value={title}/>
                }
                <input className='popup-timeblock-text' type="text" default="Body..." onChange={(e) => props.save("body", e.target.value)} value={body}/>
                <select className='popup-timeblock-text' type="text" default="Date..." onChange={(e) => props.save("date", parseInt(e.target.value))} value={new Date(date).getTime()}>
                    {
                        getWeekDaysUTC(props.week).map((day) => {
                            return <option key={day.day} value={day.date.getTime()}>{day.day}</option>
                        })
                    }
                </select>
                <select className='popup-timeblock-text' default="Time..." onChange={(e) => props.save("time", parseInt(e.target.value))} value={time}> 
                    {
                        getTimes().map((time) => {
                            return <option key={time[0]} value={time[0]}>{time[1]}</option>
                        })
                    }
                </select>
                <select className='popup-timeblock-text' type="text" default="Duration..." onChange={(e) => props.save("duration", parseInt(e.target.value))} value={duration}>
                    {
                        getDurations().map((durationArray) => {
                            return <option key={durationArray[0]} value={durationArray[0]}>{durationArray[1]}</option>
                        })
                    }
                </select>
                <select className='popup-timeblock-text' value={category || 0} onChange={(e) => props.save("category", e.target.value)} >
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
