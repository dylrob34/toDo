import React, { useEffect, useState } from "react";
import {
  useToDoContext,
  useUpdateToDoContext,
} from "../../context/ToDoContext";

const Bucket = ({ bucket }) => {
  const [selected, setSelected] = useState(false);
  const [text, setText] = useState(bucket);

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

  return (
    <div>
      <span onClick={setCurrentBucket} className={selected ? 'bucket-item selected':'bucket-item'}>{text}</span>
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
    </div>
  );
};

export default Bucket;
