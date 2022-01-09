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

    console.log("Cats")
    console.log(props.categories);

    return (
        <div>
            <div className='categories-container'>
                <div className='categories-list'>
                    <div className='categories-element'>{
                        categories.map((category) => {
                            return (
                                <Category key={category._id} className='categories-item' category={category}/>
                            )
                        })
                    }

                </div>
            </div>
        </div> 
        </div >

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
        <div className='categories-element'>
            
            <CompactPicker color={color} onChange={handleColorChange}/>
            <FaSquare onClick={ () => { setCompactPicker(!compactPicker) }} className='categories-item'
                style={{ color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}>
            </FaSquare>
            <div className='categories-item'>{title}</div>
            <FaEdit onClick={ () => handleEdit(id)}className='categories-item'></FaEdit>
            <FaTimes onClick={ () => handleDelete(id) } className='categories-item' />
            {/* <FaEyeDropper onClick={() => props.setNestedModal(true)} className='categories-item'/> */}
        </div>
    )
}
export default PopupCategories
