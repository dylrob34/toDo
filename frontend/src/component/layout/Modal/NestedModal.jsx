import React from 'react'

const NestedModal = (props) => {
    return (props.trigger) ? (
        <div>
            <div>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default NestedModal
