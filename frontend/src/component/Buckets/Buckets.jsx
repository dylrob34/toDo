import React, {useState, useEffect} from 'react'
import {FaPlus, FaTimes, FaEdit} from 'react-icons/fa';
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


    return (
        <div className='buckets'>
            <div className='buckets-title'>
                <header className='buckets-header'>Buckets</header>
                <span className='flex-spacer-4'></span>
                <FaPlus className='buckets-add' onClick={() => setPopup(true)} />
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
                                <div className='bucket-item-pop'key={index}>
                                    {bucket}
                                </div>
                                <div className='bucket-icons-pop'>
                                    <FaEdit/>
                                    <FaTimes/>
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
