import React from 'react'

const Modal = (props) => {
    return (props.trigger) ? (
        <div id='modal'>
            {props.children}
        </div>
    ) : '';
}

export default Modal
