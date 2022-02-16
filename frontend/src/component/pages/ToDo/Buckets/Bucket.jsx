import React, { useEffect, useState } from "react";
import { FaTimes, FaEdit } from 'react-icons/fa';
import { FiBox } from 'react-icons/fi'
import { get, post } from "../../../../tools/request";
import {
  useToDoContext,
  useUpdateToDoContext,
} from "../../../../context/ToDoContext";

const Bucket = ({ bucket, popup }) => {
  const [selected, setSelected] = useState(false);
  const [text, setText] = useState(bucket.name);
  const [isEditing, setIsEditing] = useState(false);
  const [_id, setId] = useState(bucket._id);
  const toDoContext = useToDoContext();
  const updateToDoContext = useUpdateToDoContext();

  useEffect(() => {
    setText(bucket.name);
    setId(bucket._id);
  }, [bucket])

  function getCurrentBucketIndex(currentBucket, id) {
    for (var i = 0; i < currentBucket.length; i++) {
      if(currentBucket[i].id === id) {
        console.log(i)
        return i;
      }
    }
  }

  const setCurrentBucket = () => {
    if (selected) {
      setSelected(false);
      var currentBuckets = toDoContext.currentBucket;
      const index = getCurrentBucketIndex(currentBuckets, bucket._id);
      if (index > -1) {
        currentBuckets.splice(index, 1);
      }
      updateToDoContext({ ...toDoContext, currentBucket: currentBuckets });
    } else {
      setSelected(true);
      let currentBuckets = toDoContext.currentBucket;
      currentBuckets.push({id: bucket._id, name: bucket.name})
      updateToDoContext({ ...toDoContext, currentBucket: currentBuckets });
    }
  };

  function showEdit(index) {
    setIsEditing(!isEditing)
  }


  function deleteBucket() {
    var currentBuckets = toDoContext.currentBucket;
    const index = getCurrentBucketIndex(currentBuckets, bucket._id);
    if (index > -1) {
      currentBuckets.splice(index, 1);
    }
    updateToDoContext({ ...toDoContext, currentBucket: currentBuckets });
    post("/api/buckets/deleteBucket", { "bucket": _id, })
      .then((resJson) => {
        if (resJson.error === true) {
          console.log("Error");
          console.log(resJson.message)
          alert("Can't delete. Please delete all tasks from bucket")
        } 
        updateToDoContext({ ...toDoContext, reloadBuckets: true });
      })
  }

  function editBucket(e) {
    console.log(e.keyCode);
    if (e.keyCode === 13 && isEditing) {
      post("/api/buckets/editBucket", { "_id": _id, "name": text })
        .then((resJson) => {
          if (resJson.error === false) {
          } else {
            console.log("error editing bucket");
          }
          showEdit()
          updateToDoContext({ ...toDoContext, reloadBuckets: true });
        })
    }
  }


  return (
    <div>
      {popup ? (
        <div className='modal-element'>
          <input type="text" className={isEditing ? "visible modal-input" : "invisible"} value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={editBucket}
          /> padding: '0rem 0rem 0rem 0.5rem';
          <div className={isEditing ? 'invisible' : 'modal-item'}>
            {text}
          </div>
          <div className='modal-element'>
            <FaEdit className='modal-item highlight' onClick={showEdit} />
            <FaTimes className='modal-item highlight' onClick={deleteBucket} />
          </div>
        </div>
      ) : <div onClick={setCurrentBucket} className={selected ? 'bucket-item selected' : 'bucket-item'}>
        <FiBox /> {/* Placeholder until we get custom icons */}
        <span>{text}</span>
      </div>}
    </div>
  );

}
export default Bucket;
