import React, {useState} from 'react'
import { FaEyeDropper, FaEdit, FaSquare, } from 'react-icons/fa';

// Ask dylan why it has to be props and not just (popup, setPopup)?
const PopupCategories = (props) => {

    // Test Data so that I can build the popup. Delete this later.
    const categoriesDefault = {
        title: "Test",
        description: "None",
        color: "#34B487" // Primary green
    }

    return (
        <div>
            <div className='categories-container'>
                <div>
                    <div className='categories-element'>
                        <Categories className='categories-item' title={categoriesDefault.title} desc={categoriesDefault.description} color={categoriesDefault.color}/>
                        <FaEdit className='categories-item'></FaEdit>
                        <FaEyeDropper onClick={() => props.setNestedModal(true)} className='categories-item'/>
                    </div>
                    <div className='categories-element'>
                        <Categories className='categories-item' title={categoriesDefault.title} desc={categoriesDefault.description} color={categoriesDefault.color}/>
                        <FaEdit className='categories-item'></FaEdit>
                        <FaEyeDropper onClick={() => props.setNestedModal(true)} className='categories-item'/>
                    </div>
                    <div className='categories-element'>
                        <Categories className='categories-item' categoriesDefault={categoriesDefault} />
                        <FaEdit className='categories-item'></FaEdit>
                        <FaEyeDropper onClick={() => props.setNestedModal(true)} className='categories-item'/>
                    </div>
                </div>
            </div>
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
