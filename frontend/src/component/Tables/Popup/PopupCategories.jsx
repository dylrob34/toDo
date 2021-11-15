import React, {useState} from 'react'
import { CirclePicker } from 'react-color';
import { FaEyeDropper, FaEdit, FaSquare, } from 'react-icons/fa';
import Popup from '../../layout/Popup';
import PopupColorPicker from './PopupColorPicker';

// Ask dylan why it has to be props and not just (popup, setPopup)?
const PopupCategories = (props) => {

    // Test Data so that I can build the popup. Delete this later.
    const categoriesDefault = {
        title: "Test",
        description: "None",
        color: "#34B487" // Primary green
    }
    
    const [toggleColorPicker, setToggleColorPicker] = useState(false) // State to toggle the colorpicker visiability

    // Function to handle the update of color picker state.
    const handleColorPicker = (input) => {
        setToggleColorPicker(input)
    }

    return (
        <div>
            <div className='categories-container'>
                <div>
                    <div className='categories-element'>
                        <Categories className='categories-item' title={categoriesDefault.title} desc={categoriesDefault.description} color={categoriesDefault.color}/>
                        <FaEdit className='categories-item'></FaEdit>
                        <FaEyeDropper onClick={() => handleColorPicker(!toggleColorPicker)} className='categories-item'/>
                    </div>
                    <div className='categories-element'>
                        <Categories className='categories-item' title={categoriesDefault.title} desc={categoriesDefault.description} color={categoriesDefault.color}/>
                        <FaEdit className='categories-item'></FaEdit>
                        <FaEyeDropper onClick={() => handleColorPicker(!toggleColorPicker)} className='categories-item'/>
                    </div>
                    <div className='categories-element'>
                        <Categories className='categories-item' categoriesDefault={categoriesDefault} />
                        <FaEdit className='categories-item'></FaEdit>
                        <FaEyeDropper onClick={() => handleColorPicker(!toggleColorPicker)} className='categories-item'/>
                    </div>
                </div>
                <div>
                    {/* Need to still style this correctly CSS file line 417 */}
                    {/* Either going to have to make the Popup file more generic or completely redo it for different popups... */}
                    <Popup trigger={toggleColorPicker} setTrigger={setToggleColorPicker} >
                        <PopupColorPicker 
                        toggleColorPicker={toggleColorPicker} 
                        setToggleColorPicker={setToggleColorPicker} 
                        className='color-picker'
                        />
                    </Popup>
                </div>
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
