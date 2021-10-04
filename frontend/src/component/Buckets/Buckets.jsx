import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa';
import Bucket from './Bucket';
import {get, post} from "../../tools/request";
import { useToDoContext, useUpdateToDoContext } from '../../context/ToDoContext';
import Popup from '../layout/Popup';

const Buckets = () => {
    const [buckets, setBuckets] = useState([]);
    const [popup, setPopup] = useState(false);
    const [addingBucket, setBucketAdd] = useState(false);
    const reload = useToDoContext();
    const setReload = useUpdateToDoContext();

    useEffect(() => {
        // Fetch todos
        if (reload.reloadBuckets === true) {
            if (reload.currentTeam === "") {
                    // let tempBuckets = [];
                    post("/api/buckets/getBuckets", {})
                    .then((res) => {
                        // for (const bucket of res.buckets) {
                        //     tempBuckets.push(bucket.name);
                        // }
                        setBuckets(res.buckets);
                    })
                    setReload({...reload, reloadBuckets: false});

                
            } else {
                post("/api/teams/getTeam", {team: reload.currentTeam})
                .then((res) => {
                    setReload({...reload, reloadBuckets: false});
                    setBuckets(res.team.buckets);
                })
            }
        }
    }, [reload, setReload])
    
    function addBucket(text) {
        post("/api/bucket/addBucket", {"name": text, 'team': reload.team})
        .then((resJson) => {
            if (resJson.error === true) {
                console.log("Add Buckets");
            }
            setReload(true);
        })
    }
    
    return (
        <div className='buckets'>
            <div className='buckets-title'>
                <header className='buckets-header'>Buckets</header>
                <span className='flex-spacer-4'></span>
                <FaBars className='buckets-add' onClick={() => setPopup(true)} />
            </div>
            <ul className='bucket-list'>
                {buckets.map((bucket, index) => (
                    <Bucket key={index} bucket={bucket} className='bucket-item' popup={false} />
                ))}
            </ul>
            <Popup trigger={popup} setTrigger={setPopup}>
                <h4 className='item-center'>Bucket List</h4>
                <div className='bucket-list-sizing'>
                {addingBucket ? <AddingBucket add={addBucket} cancel={setBucketAdd}/>: null}
                    <ul className='bucket-list-pop'>
                        <div className='bucket-elements-pop'>
                        {buckets.map((bucket, index) => {
                        return <Bucket key={index} bucket={bucket} popup={true} />
                        })}
                        </div>
                    </ul>
                </div>
                <div className='item-center'>
                    <button className='btn-sm' onClick={() => setBucketAdd(true)}>Add</button>
                    <button className='btn-sm' onClick={()=> setPopup(false)}>Close</button>
                </div>

            </Popup>
        </div>
    )
}

const AddingBucket = ({add, cancel}) => {
    const [text, setText] = useState("");
    let style = {
        marginTop: 'auto'
    }

    function editBucket(e) {
        if (e.keycode === 13) {
              add(text);
            }
        }
    
    return (
        <div className='bucket-add-pop'>
            <input type="text" className={"visible bucket-item-edit"} value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={editBucket}
            />
            <button className='btn-text' style={style} onClick={() => cancel(false)}>Cancel</button>
        </div>

    )
}

export default Buckets
