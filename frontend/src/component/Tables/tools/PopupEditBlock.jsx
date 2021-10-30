import React from 'react'

const PopupEditBlock = (props) => {
    return (props.trigger) ? (
    <div className="popup-timeblock" style={props.s}></div>
    ) : '';
}

export default PopupEditBlock
