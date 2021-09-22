import React, { useEffect, useState } from "react";
import {FaPlus, FaTimes, FaEdit, FaBars} from 'react-icons/fa';
import {get, post} from "../../tools/request";
import {
  useToDoContext,
  useUpdateToDoContext,
} from "../../context/ToDoContext";

const Bucket = ({ bucket }) => {
  const reload = useToDoContext();
  const setReload = useUpdateToDoContext();
  const [selected, setSelected] = useState(false);
  const [text, setText] = useState(bucket);
  const [isEditing, setIsEditing] = useState(false);
  const [bucketId, setBucketId] = useState(''); // NEED to find bucket Id's
  // CK edits 9/19 @ 11:34pm

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

  // This is the first attempt at the submit bucket editing need backend sync...
// CK edit on 9/19 @ 10:40pm
function showEdit(index) {
  setIsEditing(!isEditing)
  console.log("Show editing " + isEditing)
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
    <div>
      <span onClick={setCurrentBucket} className={selected ? 'bucket-item selected':'bucket-item'}>{text}</span>
      <div key={bucket.id} className='bucket-element-pop'>
          <input type="text" className={isEditing ? "visible bucket-item-edit" : "invisible"}/>
          <div className={isEditing ? 'invisible' : 'bucket-item-pop'} key={''}>
              {bucket}
            </div>
          <div className='bucket-icons-pop'>
              <FaEdit className='highlight' onClick={showEdit} key={''}/>
              <FaTimes onClick={deleteBucket}/>
            </div>
        </div>
    </div>
  );
};

export default Bucket;
