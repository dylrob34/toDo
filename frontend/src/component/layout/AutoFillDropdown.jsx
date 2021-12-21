import React, { useState, useEffect } from "react";
import Sort from "./Sort";

export default function Dropdown(props) {
    const [options, setOptions] = useState([]);
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        setOptions(updateOptions(props.options, props.text));
    }, [props.options])

    const sort = (list) => {
        let n = list.length;
        // As long as our i is less than inputArr increment i
        for (let i = 1; i < n; i++) {
            let current = list[i]; // Store the current item
            // Create a loop to look at previous items. If they are greater we need to shift/copy them to the right.
            let j = i-1; // Starting at the previous item before i
            while ((j >= 0 ) && (current.localeCompare(list[j]) < 0 )) {
                list[j+1] = list[j]; // Shift the item to the right if both conditions are met
                j--; // Decrement j to close the loop
            }
            list[j+1] = current;
        }
        return list
    }

    const checkContains = (options, substring) => {
          let temp = [];
          let found = false;
          let newIndex = 0;
          for (const element of options) {
              if (element.includes(substring)) {
                  if (!found) {
                      found = true;
                      setIndex(newIndex);
                  }
                  temp.push(element);
              }
              newIndex++;
          }
          return temp;
    }

    const updateOptions = (options, substring) => {
        let temp = [];
        let found = false;
        let newIndex = 0;
        for (const element of options) {
            if (element.includes(substring)) {
                if (!found) {
                    found = true;
                    setIndex(newIndex);
                }
                temp.push(element);
            }
            newIndex++;
        }
        return temp;
    }

    const getCurrentOptions = () => {
        return options.map((option, count) => {
            return <Option value={option} selected={count == index ? true : false} clicked={handleClicked} />
        })
    }

    const handleClicked = () => {

    }

  return (
      <div >
          <div>
            {props.first}
          </div>
          <div className="dropdown-content">
              {getCurrentOptions()}
          </div>
      </div>
  );
}

function Option(props) {
  return (
      <div onClick={props.clicked} className="dropdown-content-items">
          {props.value}
      </div>
  );
}