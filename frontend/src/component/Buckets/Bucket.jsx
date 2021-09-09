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
      updateToDoContext({ ...toDoContext, currentBucket: ""});
    } else {
      setSelected(true);
      updateToDoContext({ ...toDoContext, currentBucket: bucket});
    }
  };

  return (
    <div>
      <span onClick={setCurrentBucket} className={selected ? 'bucket-item selected':'bucket-item'}>{text}</span>
    </div>
  );
};

export default Bucket;
