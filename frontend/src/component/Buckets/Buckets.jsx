import React, {useState, useEffect} from 'react'
import {FaPlus, FaTimes, FaEdit, FaBars} from 'react-icons/fa';
import Bucket from './Bucket';
import {get, post} from "../../tools/request";
import { useToDoContext, useUpdateToDoContext } from '../../context/ToDoContext';
import Popup from '../layout/Popup';

const Buckets = () => {
    const [buckets, setBuckets] = useState([]);
    const [popup, setPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [bucketId, setBucketId] = useState(''); // NEED to find bucket Id's
    // CK edits 9/19 @ 11:34pm
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

// This is the first attempt at the submit bucket editing need backend sync...
// CK edit on 9/19 @ 10:40pm
    function showEdit(index) {
        setIsEditing(!isEditing)
        console.log("Show editing " + isEditing)
    }

    // I don't think _id is the write thing to pass.
    // CK edit on 9/19 @ 11:35pm
    function handleEdit(_id, newBucketName) {
        const editBucketList = buckets.map(bucket => {
            if (_id === bucketId) {
                return { ...bucket, name: newBucketName}
            }
            return bucket
        });
        // setBuckets(editBucketList_placeholder)
    }

    function deleteBucket() {
        post("/api/task/deleteBucket", { "id": bucketId })
            .then((resJson) => {
                if (resJson.error === true) {
                    console.log("Error deleting bucket");
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
            <ul>
                {buckets.map((bucket, index) => (
                    <Bucket key={index} bucket={bucket} className='bucket-item'/>
                ))}
            </ul>
            <Popup trigger={popup} setTrigger={setPopup}>
                <h4>Bucket List</h4>
                <ul className='bucket-list-pop'>
                    <div className='bucket-elements-pop'>
                        {buckets.map((bucket, index) => (
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
                                    ))}
                    </div>
                </ul>
                <button>Add</button>
            </Popup>
        </div>
    )
}

export default Buckets
