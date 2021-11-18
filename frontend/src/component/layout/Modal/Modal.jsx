import React from 'react'

const Modal = (props) => {
    return (props.trigger) ? (
        <div>
            <div>
                {props.children}
            </div>
        </div>
    ) : '';
}

export default Modal
