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
        <div className='modal-row-content-cats'>{
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
        setCompactPicker(false)
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
        <div className='modal-group-cats'>
            <div className='modal-element-cats'>
                <div className={compactPicker ? "color-picker-location" : 'invisible'}>
                    {/* <div className={"color-picker-arrow"}></div> */}
                    <CompactPicker  
                    color={catColor}  
                    onChange={handleColorChange}/>
                </div>
                <div onClick={ () => { setCompactPicker(!compactPicker) }} className='modal-item-cats modal-icon-cats modal-square-cats'
                style={{ backgroundColor: `rgba(${catColor.r}, ${catColor.g}, ${catColor.b})`}}>                  
                </div>
                {isEditing ? 
                    <input type="text" className='modal-input-cats'
                    autoFocus
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={editTitle}
                    />
                :
                    <div className='modal-item-cats'>{title}</div>
                }
                <span className="flex-spacer-5"></span>
                <PencilIcon onClick={showEdit} className='modal-item-cats' style={{width:'1.5rem', height:'1.5rem'}}></PencilIcon>
                <XIcon onClick={ () => handleDelete(id) } className='modal-item-cats' style={{width:'1.5rem', height:'1.5rem',marginRight:'0.15rem'}}></XIcon>
            </div>

        
        </div>
    )
}
export default PopupCategories
