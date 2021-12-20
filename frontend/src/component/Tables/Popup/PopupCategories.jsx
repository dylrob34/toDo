import React, { useEffect, useState} from 'react'
import { FaEyeDropper, FaEdit, FaSquare, FaTimes } from 'react-icons/fa';
import { CirclePicker, CompactPicker } from 'react-color';


// Ask dylan why it has to be props and not just (popup, setPopup)?
const PopupCategories = (props) => {
    const defaultColor = {
        r: '52',
        g: '180',
        b: '135',
        a: '1',
    }
    
    // Test Data so that I can build the popup. Delete this later.
    const categoriesDefault = {
        title: "Test",
        description: "None"
    } 

    const [compactPicker, setCompactPicker] = useState(false)
    const [color, setColor] = useState(defaultColor) //Primary Green from CSS file.



    // Handle function that changes the state of color by the color selected in CompactPicker
    const handleColorChange = (color) => {
        setColor(color.rgb)
    }

    return (
        <div>
            <div className='categories-container'>
                <div className='categories-list'>
                    <div className='categories-element'>
                        <div className={compactPicker ? 'picker-compact' : "invisible"}>
                            <CompactPicker color={color} onChange={handleColorChange}/>
                        </div>
                        <Category className='categories-item' setCompactPicker={setCompactPicker} compactPicker={compactPicker} title={categoriesDefault.title} desc={categoriesDefault.description} color={color}/>
                    </div>
                </div> 
            </div>
        </div>

    )
}

const Category = ({props, title, color, setCompactPicker, compactPicker}) => {
    
    return(
        <div className='categories-element'>
            <FaSquare onClick={() => {setCompactPicker(!compactPicker)}} className='categories-item' 
            style={{color: `rgba(${color.r }, ${color.g }, ${color.b }, ${color.a })`}}>
            </FaSquare>
            <div className='categories-item'>{title}</div>
            <FaEdit className='categories-item'></FaEdit>
            <FaTimes className='categories-item'/>
            {/* <FaEyeDropper onClick={() => props.setNestedModal(true)} className='categories-item'/> */}
        </div>
    )
}
export default PopupCategories
