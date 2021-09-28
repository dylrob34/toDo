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
// Uncomment when we figure out what Buckets look like on the backend. Yay!
// function deleteBucket() {
//   post("/api/task/deleteBucket", { "id": bucketId })
//       .then((resJson) => {
//           if (resJson.error === true) {
//               console.log("Error deleting bucket");
//           }
//           setReload(true);
//       })
// }

function handleEnter(e) {
  if (e.keyCode === 13) {
    console.log("Press enter.")
  }
}

  return (
    <div>
      { popup ? (
        <div className='bucket-element-pop'>
        <input type="text" className={isEditing ? "visible bucket-item-edit" : "invisible"} value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleEnter}
        />
        <div className={isEditing ? 'invisible' : 'bucket-item-pop'}>
            {text}
          </div>
        <div className='bucket-icons-pop'>
            <FaEdit className='highlight' onClick={showEdit}/>
            <FaTimes onClick={''}/>
          </div>
      </div>
      ) : <div onClick={setCurrentBucket} className={selected ? 'bucket-item selected':'bucket-item'}>
          <FaDiceD6/> {/* Placeholder until we get custom icons */}
          {text}
        </div> }
    </div>
  );
};

export default Bucket;
