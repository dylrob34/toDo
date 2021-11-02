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
    }, [props.data])
    
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

    return (
    <div className="popup-timeblock" style={props.s}>
        {
            props.cell ? 
            <input type="text" default="Title..." onChange={(e) => setTitle(e.target.value)} value={title}/>
            :
            <input autoFocus type="text" default="Title..." onChange={(e) => setTitle(e.target.value)} value={title}/>
        }
        <input type="text" default="Body..." onChange={(e) => setBody(e.target.value)} value={body}/>
        <input type="text" default="DOW..." onChange={(e) => setDow(e.target.value)} value={dow}/>
        <input type="text" default="Time..." onChange={(e) => setTime(parseInt(e.target.value))} value={props.timeStrings[time]}/>
        <input type="text" default="Duration..." onChange={(e) => setDuration(parseInt(e.target.value))} value={duration}/>
        <button onClick={setData} type="button">Submit</button>
    </div>
    );
}

export default PopupEditBlock
