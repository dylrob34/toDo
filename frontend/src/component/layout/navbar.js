import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link to='/capture'>Capture</Link>
                </li>
                <li>
                    <Link to='/timeblock'>Timeblock</Link>
                </li>
                <li>
                    <Link to='/todo_list'>ToDo List</Link>
                </li>
                <li>
                    <Link to='/calendar'>Calendar</Link>
                </li>
            </ul>
        </nav>
    )
}

export default navbar;
