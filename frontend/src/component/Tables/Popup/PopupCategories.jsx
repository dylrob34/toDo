import React, {useState} from 'react'
import { CirclePicker } from 'react-color';
import { FaEyeDropper, FaEdit, FaSquare, } from 'react-icons/fa';

// Ask dylan why it has to be props and not just (popup, setPopup)?
const PopupCategories = (props) => {

    const [toggleColorPicker, setToggleColorPicker] = useState(false)
    const categoriesDefault = {
        title: "Test",
        description: "None",
        color: "#34B487" // Primary green
    }

    console.log(toggleColorPicker)
    const colorPicker = (toggleColorPicker) => {
        console.log('Working...')
        if (toggleColorPicker) {
            return <CirclePicker />
        }
        return null
    }

    return (
        <div className='categories-container'>
            <div className='categories-element'>
                <Categories className='categories-item' title={categoriesDefault.title} desc={categoriesDefault.description} color={categoriesDefault.color}/>
                <FaEdit className='categories-item'></FaEdit>
                <FaEyeDropper onClick={() => setToggleColorPicker(!toggleColorPicker)} className='categories-item'>{colorPicker()}</FaEyeDropper>
            </div>
            <div className='categories-element'>
                <Categories className='categories-item' title={categoriesDefault.title} desc={categoriesDefault.description} color={categoriesDefault.color}/>
                <FaEdit className='categories-item'></FaEdit>
                <FaEyeDropper onClick={colorPicker()} className='categories-item'></FaEyeDropper>
            </div>
            {/* How do I get it work like this? Below: */}
            <div className='categories-element'>
                <Categories className='categories-item' categoriesDefault={categoriesDefault} />
                <FaEdit className='categories-item'></FaEdit>
                <FaEyeDropper onClick={colorPicker()} className='categories-item'></FaEyeDropper>
            </div>
            <button onClick={() => props.setPopup(false)}>close</button>
        </div>
    )
}

const Categories = ({title, desc, color}) => {
    
    return(
        <div className='categories-element'>
            <FaSquare className='categories-item' style={{color: color}} ></FaSquare>
            <div className='categories-item'>{title}</div>
        </div>
    )
}
export default PopupCategories
