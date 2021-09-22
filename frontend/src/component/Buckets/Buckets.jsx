import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa';
import Bucket from './Bucket';
import {get, post} from "../../tools/request";
import { useToDoContext, useUpdateToDoContext } from '../../context/ToDoContext';
import Popup from '../layout/Popup';

const Buckets = () => {
    const [buckets, setBuckets] = useState([]);
    const [popup, setPopup] = useState(false);
    const reload = useToDoContext();
    const setReload = useUpdateToDoContext();

    useEffect(() => {
        // Fetch todos
        if (reload.reloadBuckets === true) {
            if (reload.currentTeam === "") {
                get("/api/user/getuser")
                .then((response) => {
                    setReload({...reload, reloadBuckets: false});
                    setBuckets(response.user.buckets);
                })
            } else {
                post("/api/teams/getTeam", {team: reload.currentTeam})
                .then((res) => {
                    setReload({...reload, reloadBuckets: false});
                    setBuckets(res.team.buckets);
                })
            }
        }
    }, [reload, setReload])
    
    // This all could be wrong now... CK Edits 9/21/2021 10:00pm
    // // I don't think _id is the right thing to pass.
    // // CK edit on 9/19 @ 11:35pm
    // function handleEdit(_id, newBucketName) {
    //     const editBucketList = buckets.map(bucket => {
    //         if (_id === bucketId) {
    //             return { ...bucket, name: newBucketName}
    //         }
    //         return bucket
    //     });
    //         // setBuckets(editBucketList_placeholder)
    //     }

    return (
        <div className='buckets'>
            <div className='buckets-title'>
                <header className='buckets-header'>Buckets</header>
                <span className='flex-spacer-4'></span>
                <FaBars className='buckets-add' onClick={() => setPopup(true)} />
            </div>
            <ul>
                {buckets.map((bucket, index) => (
                    <Bucket key={index} bucket={bucket} className='bucket-item'/>
                ))}
            </ul>
            <Popup trigger={popup} setTrigger={setPopup}>
                <h4>Bucket List</h4>
                <ul className='bucket-list-pop'>
                    <div className='bucket-elements-pop'>
                    
                    {buckets.map((bucket) => {
                    // CK edits 9/20 @ 9:30pm (Big pseudo code below lol)
                    // if logic I want:
                    // if buckets array !== 0 or "some condition I haven't thought of" then display buckets.
                    // if not then return a warning there is no buckets.
                    if (bucket.array !== 0 || 'some other condition') {
                        return <Bucket key={''} task={bucket} setReload={setReload} />
                    }
                    return null;
                        })
                    }
                        {/* 
                        CK edits 9/20 @ 9:23pm commented out "working" code below.
                        {buckets.map((bucket) => (
                            <div key={bucket.id} className='bucket-element-pop'>
                                <input type="text" className={isEditing ? "visible bucket-item-edit" : "invisible"}/>
                                <div className={isEditing ? 'invisible' : 'bucket-item-pop'} key={index}>
                                    {bucket}
                                </div>
                                <div className='bucket-icons-pop'>
                                    <FaEdit className='highlight' onClick={showEdit} key={index}/>
                                    <FaTimes onClick={deleteBucket}/>
                                </div>
                            </div>
                                    ))} */}
                    </div>
                </ul>
                <button>Add</button>
            </Popup>
        </div>
    )
}

export default Buckets
