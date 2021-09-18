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
    </div>
  );
};

export default Bucket;
