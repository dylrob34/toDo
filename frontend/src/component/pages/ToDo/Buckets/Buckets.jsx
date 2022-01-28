import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa';
import Bucket from './Bucket';
import {get, post} from "../../../../tools/request";
import { useToDoContext, useUpdateToDoContext } from '../../../../context/ToDoContext';
import Popup from '../../../layout/Popup';
import Modal from '../../../layout/Modal/Modal';
import { PlusIcon } from '@heroicons/react/solid'

const Buckets = () => {
    const [buckets, setBuckets] = useState([]);
    const [popup, setPopup] = useState(false);
    const [addingBucket, setBucketAdd] = useState(false);
    const toDoContext = useToDoContext();
    const setToDoContext = useUpdateToDoContext();

    useEffect(() => {
        // Fetch todos
        if (toDoContext.reloadBuckets === true) {
            if (toDoContext.currentTeam === "") {
                post("/api/buckets/getBuckets", {})
                .then((res) => {
                    setBuckets(res.buckets);
                })
            } else {
                post("/api/buckets/getBuckets", {team: toDoContext.currentTeam})
                .then((res) => {
                    setBuckets(res.buckets);
                })
            }
            setToDoContext({...toDoContext, reloadBuckets: false});
        }
    }, [toDoContext])
    
    function addBucket(text) {
        post("/api/bucket/addBucket", {"name": text, 'team': toDoContext.team})
        .then((resJson) => {
            if (resJson.error === true) {
                console.log("Add Buckets");
            }
            setToDoContext({...toDoContext, reloadBuckets: true});
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
                    <Bucket key={bucket._id} bucket={bucket} className='bucket-item' popup={false} />
                ))}
            </ul>

            <Modal trigger={popup} setTrigger={setPopup}>
                <div className='modal-background'>
                    <div className='modal'>
                        <div className='modal-container'>
                            <div className='modal-row' style={{padding:"0px 0px 30px 0px", justifyContent:'space-between'}}>
                                <h2 className='modal-header'>Bucket List</h2>
                                <div className='m-btn m-btn-sml' onClick={addBucket} style={{left:"-18px"}}>
                                    <PlusIcon className='fa-sml' style={{height:'20px', width:'20px'}}></PlusIcon>
                                </div>
                            </div>
                            <div className='modal-row modal-row-content' style={{padding:"0px 0px 0px 0px"}}>
                                {addingBucket ? <AddingBucket add={addBucket} cancel={setBucketAdd}/>: null}
                                    <ul className='modal-group'>
                                        <div className=''>
                                        {buckets.map((bucket, index) => {
                                        return <Bucket key={index} bucket={bucket} popup={true} />
                                        })}
                                        </div>
                                    </ul>
                            </div>
                            <div className='modal-row' style={{paddingTop:"30px", justifyContent:'center'}}>
                                <div className='m-btn m-btn-lrg' onClick={() => setPopup(false)}>Close</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
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
