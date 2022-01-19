import React, { useEffect, useState } from 'react'
import { FaEyeDropper, FaEdit, FaSquare, FaTimes } from 'react-icons/fa';
import { CirclePicker, CompactPicker } from 'react-color';
import { useTimeBlockContext, useUpdateTimeBlockContext } from '../../../../context/TimeBlockContext';
import { post } from '../../../../tools/request';


// Ask dylan why it has to be props and not just (popup, setPopup)?
const PopupCategories = (props) => {
    const [compactPicker, setCompactPicker] = useState(false)
    const [categories, setCategories] = useState(props.categories);

    useEffect(() => {
        setCategories(props.categories);
    }, [props.categories]);

    return (
        <div className=''>{
            categories.map((category) => {
                return (
                    <Category key={category._id} className='' category={category}/>
                )
            })
        } 
        </div>
    )
}

const Category = ({ category }) => {
    const [id, setId] = useState(category._id);
    const [title, setTitle] = useState(category.title);    
    const [color, setColor] = useState(category.color);
    const [compactPicker, setCompactPicker] = useState(false);
    const timeBlockContext = useTimeBlockContext();
    const updateTimeBlockContext = useUpdateTimeBlockContext();

    useEffect(() => {
        setId(category._id);
        setTitle(category.title);
        setColor(category.color);
    }, [category._id, category.title, category.color])

    const handleColorChange = () => {

    }

    const handleEdit = () => {
        post("/api/categories/editCategory", {
            id,
            title,
            color,
        })
            .then((resJson) => {
                if (resJson.error === true) {
                    console.log( "Error editing category." );
                } else {
                    updateTimeBlockContext({...timeBlockContext, reloadCategories: true})
                }
            })
    }

    const handleDelete = () => {
        post("/api/categories/deleteCategory", { "id": id })
            .then((resJson) => {
                if (resJson.error === true) {
                    console.log( "Error deleting Category." );
                }
                updateTimeBlockContext({...timeBlockContext, reloadCategories: true})
            })
    }


    return (
        <div className='modal-group'>
            {/* <CompactPicker color={color} onChange={handleColorChange}/> */}
            <div className='modal-element'>
                <div className='modal-item'>
                    <FaSquare onClick={ () => { setCompactPicker(!compactPicker) }} className=''
                        style={{ color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}>
                    </FaSquare>
                    <div className=''>{title}</div>
                </div>
                <div className='modal-item'>
                    <FaEdit onClick={ () => handleEdit(id)} className=''></FaEdit>
                    <FaTimes onClick={ () => handleDelete(id) } className='' />
                </div>
                
                
                {/* <FaEyeDropper onClick={() => props.setNestedModal(true)} className='categories-item'/> */}
            </div>

        
        </div>
    )
}
export default PopupCategories
