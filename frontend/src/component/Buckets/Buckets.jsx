import React, {useState, useEffect} from 'react'
import {FaPlus} from 'react-icons/fa';
import Bucket from './Bucket';
import {get} from "../../tools/request";
import { useToDoContext, useUpdateToDoContext } from '../../context/ToDoContext';

const Buckets = ({ setCurrentBucket }) => {
    const [buckets, setBuckets] = useState([]);
    const reload = useToDoContext();
    const setReload = useUpdateToDoContext();

    useEffect(() => {
        // Fetch todos
        if (reload.reloadBuckets === true) {
            get("/api/user/getuser")
            .then((response) => {
                setReload({...reload, reloadBuckets: false});
                setBuckets(response.user.buckets);
            })
        }
    }, [reload.reloadBuckets])

    return (
        <div>
            <div className='buckets-title'>
                <header className='buckets-header'>Buckets</header>
                <span className='flex-spacer-4'></span>
                <FaPlus className='buckets-add' />
            </div>
            <ul>
                {buckets.map((bucket, index) => (
                    <Bucket key={index} bucket={bucket} className='bucket-item'/>
                ))}
            </ul>

            {/* <div className='buckets-popup'>

            </div> */}
        </div>
    )
}

export default Buckets
