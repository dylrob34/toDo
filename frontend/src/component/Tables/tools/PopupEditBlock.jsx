import React, {useState} from 'react'

const PopupEditBlock = (props) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [dow, setDow] = useState(props.dow);
    const [time, setTime] = useState(props.time);
    const [duration, setDuration] = useState(0);
    
    const setData = (e) => {
        props.setPopup(false);
        props.setData({
            title,
            body,
            dow,
            time,
            duration
        });
    }

    return (props.trigger) ? (
    <div className="popup-timeblock" style={props.s}>
        <input type="text" default="Title..." onChange={(e) => setTitle(e.target.value)} value={title}/>
        <input type="text" default="Body..." onChange={(e) => setBody(e.target.value)} value={body}/>
        <input type="text" default="DOW..." onChange={(e) => setDow(e.target.value)} value={dow}/>
        <input type="text" default="Time..." onChange={(e) => setTime(parseInt(e.target.value))} value={props.timeStrings[time]}/>
        <input type="text" default="Duration..." onChange={(e) => setDuration(parseInt(e.target.value))} value={duration}/>
        <button onClick={setData} type="button">Submit</button>
    </div>
    ) : '';
}

export default PopupEditBlock
