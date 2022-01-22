import React, { useEffect, useState } from 'react'
import { FaSquare, FaTimes, FaPen } from 'react-icons/fa';
import { CirclePicker, CompactPicker } from 'react-color';
import { useTimeBlockContext, useUpdateTimeBlockContext } from '../../../../context/TimeBlockContext';
import { post } from '../../../../tools/request';

import { PencilIcon, XIcon } from '@heroicons/react/solid'

// Ask dylan why it has to be props and not just (popup, setPopup)?
const PopupCategories = (props) => {
    const [categories, setCategories] = useState(props.categories);

    useEffect(() => {
        setCategories(props.categories);
    }, [props.categories]);

    return (
        <div className=''>{
            categories.map((category) => {
                return (
                    <Category key={category._id} category={category}/>
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
    const [isEditing, setIsEditing] = useState(false)
    const timeBlockContext = useTimeBlockContext();
    const updateTimeBlockContext = useUpdateTimeBlockContext();

    useEffect(() => {
        setId(category._id);
        setTitle(category.title);
        setColor(category.color);
    }, [category._id, category.title, category.color])

    const handleColorChange = () => {
        setColor({color: color.rgb})
    }

    const showEdit = () => {
        setIsEditing(!isEditing)
    }


    function editTitle(e) {
        console.log(e.keyCode)
        if (e.keyCode === 13 && isEditing === true) {
            post("/api/categories/editCategory", {"id":id, "title":title, "color":color})
            .then((resJson) => {
                if (resJson.error === false) {
                } else {
                  console.log("Error editing category title");
                }
                showEdit()
                updateTimeBlockContext({ ...timeBlockContext, reloadCategories: true });
              })
        }
    }

    // const handleEdit = () => {
    //     post("/api/categories/editCategory", {
    //         id,
    //         title,
    //         color,
    //     })
    //         .then((resJson) => {
    //             if (resJson.error === true) {
    //                 console.log( "Error editing category." );
    //             } else {
    //                 updateTimeBlockContext({...timeBlockContext, reloadCategories: true})
    //             }
    //         })
    // }

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
            {/* Until I figure out how to make this compact picker in the correct spot it will make the modal look funky */}
            {/* <CompactPicker color={color} className={compactPicker ? "visible" : "invisible"} onChange={handleColorChange}/> */}
            <div className='modal-element'>
                    <FaSquare onClick={ () => { setCompactPicker(!compactPicker) }} className='modal-item'
                        style={{ color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`, paddingRight:".75rem" }}
                        >
                    </FaSquare>
                    <input type="text" className={isEditing ? 'visible' : "invisible"} 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={editTitle}
                    />                    
                    <div className={isEditing ? "invisible" : "visible 'modal-item'"}>{title}</div>
                    <span className="flex-spacer-5"></span>
                    <PencilIcon onClick={showEdit} className='modal-item' style={{width:'20px', height:'20px', paddingRight:"2px"}}></PencilIcon>
                    <XIcon onClick={ () => handleDelete(id) } className='modal-item' style={{width:'20px', height:'20px'}}></XIcon>
            </div>

        
        </div>
    )
}
export default PopupCategories
