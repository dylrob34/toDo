import React, { useEffect, useState } from 'react'
import { FaSquare, FaTimes, FaPen } from 'react-icons/fa';
import { CirclePicker, CompactPicker } from 'react-color';
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
                    <Category key={category._id} category={category} setLoad={props.setLoad}/>
                )
            })
        } 
        </div>
    )
}

const Category = ({ category, setLoad }) => {
    const [id, setId] = useState(category._id);
    const [title, setTitle] = useState(category.title);    
    const [catColor, setCatColor] = useState(category.color);
    const [compactPicker, setCompactPicker] = useState(false);
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        setId(category._id);
        setTitle(category.title);
        setCatColor(category.color);
    }, [category._id, category.title, category.color])
    
    
    const showEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleColorChange = (color) => {
        const newColor = {r: color.rgb.r.toString(), g: color.rgb.g.toString(), b: color.rgb.b.toString()}
        setCatColor(newColor)
        editColor("color", newColor)
    }

    function editColor(key, value )  {
        post("/api/categories/editCategory", {...category, [key]:value})
        .then((resJson) => {
            if (resJson.error === false) {
            } else {
              console.log("Error editing category title");
            }
            setLoad(true);
          })
    }

    function editTitle(e) {
        if (e.keyCode === 13 && isEditing === true) {
            post("/api/categories/editCategory", {"_id":id, "title":title, "color":catColor})
            .then((resJson) => {
                if (resJson.error === false) {
                } else {
                  console.log("Error editing category title");
                }
                showEdit()
                setLoad(true);
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
                setLoad(true);
            })
    }


    return (
        <div className='modal-group'>
            {/* Until I figure out how to make this compact picker in the correct spot it will make the modal look funky */}
            {/* Need to do in line positioning with reference to the position of the Category Title. */}
            <div className='color-picker-location'> 
                <div className={compactPicker ? "visible color-picker-arrow" : "invisible"}/>
                <CompactPicker 
                className={compactPicker ? "visible" : "invisible"}
                color={catColor}  
                onChange={handleColorChange}/>
            </div>
            <div className='modal-element'>
                    <FaSquare onClick={ () => { setCompactPicker(!compactPicker) }} className='modal-item'
                        style={{ color: `rgba(${catColor.r}, ${catColor.g}, ${catColor.b})`, paddingRight:".75rem" }}
                        >
                    </FaSquare>
                    {isEditing ? 
                        <input type="text" className='modal-input'
                        autoFocus
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={editTitle}
                        />
                    :
                        <div className='modal-item'>{title}</div>
                    }
                    <span className="flex-spacer-5"></span>
                    <PencilIcon onClick={showEdit} className='modal-item' style={{width:'20px', height:'20px', paddingRight:"2px"}}></PencilIcon>
                    <XIcon onClick={ () => handleDelete(id) } className='modal-item' style={{width:'20px', height:'20px'}}></XIcon>
            </div>

        
        </div>
    )
}
export default PopupCategories
