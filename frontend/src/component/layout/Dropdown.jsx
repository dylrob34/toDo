import React, { useState } from "react";

export function Dropdown(props) {
    const [mouseOver, setMouseOver] = useState(false);

    function onMouseEnter() {
        setMouseOver(true);
    }

    function onMouseLeave() {
        setMouseOver(false);
    }

  return (
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <div>
            {props.first}
          </div>
          <div className="dropdown-content">
              {mouseOver ? props.children : null}
          </div>
      </div>
  );
}

export function Option(props) {
  return (
      <div onClick={props.clicked} className="dropdown-content-items">
          {props.value}
      </div>
  );
}