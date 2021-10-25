import React, {useState, useRef, Fragment} from 'react'

const Cell = ({data}) => {
    const [title, setTitle] = useState(data.title);
    const [body, setBody] = useState(data.body);
    const [dow, setDow] = useState(data.dow);
    const [time, setTime] = useState(data.tiem);
    const [duration, setDuration] = useState(data.duration);
    const [isEditing, setIsEditing] = useState(false);

    // var myTitleRef = useRef(title);
    // const _setTitle = data => {
    //     myTitleRef.current = data;
    //     setTitle(data)
    // }
    
    function editBlock() {
        setIsEditing(!isEditing)
    }


    return (
        <div className="table-col">
            <div onClick={editBlock}>{
                isEditing ? <form ><EditBlockRow/></form> : <ReadOnlyRow title={title}/>
            }
            </div>
        </div>
    )
}

const ReadOnlyRow = ({title}) => {

    return (
        <div className='table-row editable'>{title}</div>
    )
}

const EditBlockRow = ({title}) => {

    return (
    <div className="table-col">
        <div className='table-row table-fill'>
            <input 
                type="text"
                name="title" 
                id="title" 
                required='required' 
                placeholder='Timeblock...'/>
        </div>
    </div>
    )
}
export default Cell


// So close on the editable field just need to get it so that when the input box stays open until enter is pressed or something like that.