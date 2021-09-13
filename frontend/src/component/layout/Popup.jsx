import React from 'react'

const Popup = (props) => {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                {props.children}
                <button className='popup-close' onClick={()=> props.setTrigger(false)}>close</button>
            </div>
        </div>
    ) : '';
}

export default Popup
