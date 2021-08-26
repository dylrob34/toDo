import React from 'react'
import {FaPlus} from 'react-icons/fa';
import Bucket from './Bucket';

const Buckets = () => {
    return (
        <div>
            <div className='buckets-title'>
                <header className='buckets-header'>Buckets</header>
                <span className='flex-spacer-4'></span>
                <FaPlus className='buckets-add' onClick=''/>
            </div>
            <ul>
                <Bucket/>
            </ul>

            <div className='buckets-popup'>

            </div>
        </div>
    )
}

export default Buckets
