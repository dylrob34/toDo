import React, {useState, useEffect} from 'react'
import {FaPlus} from 'react-icons/fa';
import Bucket from './Bucket';
import {get} from "../../tools/request";

const Buckets = () => {
    const [reload, setReload] = useState(true);
    const [buckets, setBuckets] = useState([]);

    useEffect(() => {
        // Fetch todos
        if (reload === true) {
            get("/api/user/getuser")
            .then((response) => {
                setReload(false);
                setBuckets(response.user.buckets);
            })
        }
    }, [reload])

    return (
        <div>
            <div className='buckets-title'>
                <header className='buckets-header'>Buckets</header>
                <span className='flex-spacer-4'></span>
                <FaPlus className='buckets-add' onClick=''/>
            </div>
            <ul>
                {buckets.map((bucket, index) => (
                    <Bucket key={index} bucket={bucket} setReload={setReload}/>
                ))}
            </ul>

            <div className='buckets-popup'>

            </div>
        </div>
    )
}

export default Buckets
