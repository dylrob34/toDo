import React, {useState, useEffect} from 'react'
import { useTimeBlockContext } from '../../../../context/TimeBlockContext';



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
            temp.push(props.timeStrings[key]);
        }
        return temp;
    }

    const getCategories = () => {
        let temp = [];
        for (const cat of categories) {
            temp.push(cat);
        }
        temp.push({
            none: true,
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
                <input className='popup-timeblock-text' type="text" default="DOW..." onChange={(e) => props.save("dow", e.target.value)} value={props.data.dow}/>
                <select className='popup-timeblock-text' default="Time..." onChange={(e) => props.save("time", e.target.value)} value={props.timeStrings[props.data.time]}> 
                    {
                        getTimes().map((key) => {
                            return <option value={key}>{key}</option>
                        })
                    }
                </select>
                <select className='popup-timeblock-text' type="text" default="Duration..." onChange={(e) => props.save("duration", e.target.value)} value={props.data.duration}>
                    {
                        getDurations().map((durationArray) => {
                            return <option value={durationArray[0]}>{durationArray[1]}</option>
                        })
                    }
                </select>
                <select className='popup-timeblock-text' onChange={(e) => props.save("category", e.target.value)} >
                    {
                        getCategories().map((category) => {
                            if (props.category === category._id) {
                                return <option value={category._id} selected>{category.title}</option>
                            }
                            return <option value={category._id}>{category.title}</option>
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
