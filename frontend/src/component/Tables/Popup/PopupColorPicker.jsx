import React, {useState} from 'react'
import { CirclePicker } from 'react-color';

const PopupColorPicker = (props) => {

    
    return (
        <div>
            <CirclePicker />
            <button onClick={() => props.setToggleColorPicker(false)}>close</button>
        </div>
    )
}

export default PopupColorPicker
