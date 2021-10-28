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
            <div>{
                isEditing ? <EditBlockCell isEditing={isEditing} setIsEditing={setIsEditing} title={title} setTitle={setTitle}/> : <ReadOnlyCell editBlock={editBlock} title={title}/>
            }
            </div>
        </div>
    )
}

const ReadOnlyCell = ({title, editBlock}) => {
    return (
        <div title={title} onClick={editBlock} className='table-row editable readonly-cell'>{title}</div>
    )
}

const EditBlockCell = ({title, setTitle, setIsEditing, isEditing}) => {
    
    function handleSubmit(e) {
        e.preventDefault();
        setTitle(title)
        setIsEditing(!isEditing)
    }
    

    return (
    <div className="table-col">
        <div className='table-row table-fill editable-cell'>
            <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='table-input'
                    name="title" 
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Timeblock...'/>
            </form>
        </div>
    </div>
    )
}
export default Cell

