import React from 'react'

const NestedModal = (props) => {
    return (props.trigger) ? (
        <div id='nestedModal'>
                {props.children}
        </div>
    ) : "";
}

export default NestedModal
