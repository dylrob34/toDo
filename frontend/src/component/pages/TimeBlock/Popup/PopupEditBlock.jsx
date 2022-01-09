import React, {useState, useEffect} from 'react'



const PopupEditBlock = (props) => {
    const [title, setTitle] = useState(props.data.title);
    const [body, setBody] = useState(props.data.body);
    const [dow, setDow] = useState(props.data.dow);
    const [time, setTime] = useState(props.data.time);
    const [duration, setDuration] = useState(props.data.duration || 0);

    useEffect(() => {
        setTitle(props.data.title);
        setBody(props.data.body);
        setDow(props.data.dow);
        setTime(props.data.time);
        setDuration(props.data.duration);
    }, [props.data.title, props.data.body, props.data.dow, props.data.time, props.data.duration])
    
    const setData = (e) => {
        props.setPopup(false);
        props.setData({
            title,
            body,
            dow,
            time,
            duration,
            catagory: "none"
        });
    }

    const getTimes = () => {
        let temp = []
        for (const key of Object.keys(props.timeStrings)) {
            temp.push(props.timeStrings[key]);
        }
        return temp;
    }

    return (
    <div>
        <div className='popup-timeblock-container'>
            <div className='popup-timeblock-relative'>
                <div className="popup-timeblock-arrow"/>
                {
                    props.cell ? 
                    <input className='popup-timeblock-text' ype="text" default="Title..." onChange={props.data.handleSetTitle} value={title}/>
                    :
                    <input className='popup-timeblock-text' autoFocus type="text" default="Title..." onChange={props.datahandleSetTitle} value={title}/>
                }
                <input className='popup-timeblock-text' type="text" default="Body..." onChange={props.data.handleSetBody} value={body}/>
                <input className='popup-timeblock-text' type="text" default="DOW..." onChange={props.data.handleSetDow} value={dow}/>
                <select className='popup-timeblock-text' default="Time..." onChange={props.data.handleSetTime} value={props.timeStrings[time]}> 
                    {
                        getTimes().map((key) => {
                            return <option value={key}>{key}</option>
                        })
                    }
                </select>
                <input className='popup-timeblock-text' type="text" default="Duration..." onChange={props.data.setDuration} value={duration}/>
                <button className='btn-sm' onClick={setData} type="button">Replace w/ auto</button>
        </div>    
        </div>
    </div>
    );
}

export default PopupEditBlock
{/* <img src="TimeBlock_Popover.svg" alt="Error..." className="popup-timeblock-bckgrnd" style={props.s}/> */}
