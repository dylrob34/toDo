import React, { useEffect, useState } from "react";
import {FaPlus, FaTimes, FaEdit, FaBars, FaDiceD6} from 'react-icons/fa';
import {get, post} from "../../tools/request";
import {
  useToDoContext,
  useUpdateToDoContext,
} from "../../context/ToDoContext";

const Bucket = ({ bucket, popup }) => {
  const reload = useToDoContext();
  const setReload = useUpdateToDoContext();
  const [selected, setSelected] = useState(false);
  const [text, setText] = useState(bucket);
  const [isEditing, setIsEditing] = useState(false);
  const [_id, setId] = useState(bucket._id);

  const toDoContext = useToDoContext();
  const updateToDoContext = useUpdateToDoContext();

  useEffect(() => {
    setText(bucket);
  }, [bucket])

  const setCurrentBucket = () => {
    if (selected) {
      setSelected(false);
      var currentBuckets = toDoContext.currentBucket;
      const index = currentBuckets.indexOf(bucket);
      if (index > -1) {
        currentBuckets.splice(index, 1);
      }
      updateToDoContext({ ...toDoContext, currentBucket: currentBuckets});
    } else {
      setSelected(true);
      let currentBuckets = toDoContext.currentBucket;
      currentBuckets.push(bucket)
      updateToDoContext({ ...toDoContext, currentBucket: currentBuckets});
    }
  };

function showEdit(index) {
  setIsEditing(!isEditing)
  console.log("Show editing " + isEditing)
}


function deleteBucket() {
  post("/api/bucket/deleteBucket", { "_id": _id, })
      .then((resJson) => {
          if (resJson.error === true) {
              console.log("Delete Buckets");
          }
          setReload(true);
      })
}

function editBucket(e) {
  if (e.keycode === 13 && isEditing) {
        post("/api/bucket/editBucket", { "_id": _id, "name": text })
        .then((resJson) => {
            if (resJson.error === false) {
                console.log("Edit Buckets");
            } else {
              console.log("error editing bucket");
            }
            setReload(true);
        })
      }
  }


  return (
    <div>
      { popup ? (
        <div className='bucket-element-pop'>
        <input type="text" className={isEditing ? "visible bucket-item-edit" : "invisible"} value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={editBucket}
        />
        <div className={isEditing ? 'invisible' : 'bucket-item-pop'}>
            {text}
          </div>
        <div className='bucket-icons-pop'>
            <FaEdit className='highlight' onClick={showEdit}/>
            <FaTimes onClick={deleteBucket}/>
          </div>
      </div>
      ) : <div onClick={setCurrentBucket} className={selected ? 'bucket-item selected':'bucket-item'}>
          <FaDiceD6/> {/* Placeholder until we get custom icons */}
          {text}
        </div> }
    </div>
  );

}
export default Bucket;
