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
                    <input className='popup-timeblock-text' ype="text" default="Title..." onChange={(e) => props.data.setTitle(e.target.value)} value={title}/>
                    :
                    <input className='popup-timeblock-text' autoFocus type="text" default="Title..." onChange={(e) => setTitle(e.target.value)} value={title}/>
                }
                <input className='popup-timeblock-text' type="text" default="Body..." onChange={(e) => setBody(e.target.value)} value={body}/>
                <input className='popup-timeblock-text' type="text" default="DOW..." onChange={(e) => setDow(e.target.value)} value={dow}/>
                <select className='popup-timeblock-text' default="Time..." onChange={(e) => setTime(parseInt(e.target.value))} value={props.timeStrings[time]}> 
                    {
                        getTimes().map((key) => {
                            return <option value={key}>{key}</option>
                        })
                    }
                </select>
                <input className='popup-timeblock-text' type="text" default="Duration..." onChange={(e) => setDuration(parseInt(e.target.value === "" ? 0 : e.target.value))} value={duration}/>
                <button className='btn-sm' onClick={setData} type="button">Replace w/ auto</button>
        </div>    
        </div>
    </div>
    );
}

export default PopupEditBlock
{/* <img src="TimeBlock_Popover.svg" alt="Error..." className="popup-timeblock-bckgrnd" style={props.s}/> */}
