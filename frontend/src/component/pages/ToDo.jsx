import React, { useState, createContext, useReducer, useContext } from 'react'
import { Redirect } from 'react-router';
import { getLoggedIn, getToken } from '../../context/loggedInState';
import { domain } from "../../App";
import Tasks from '../Tasking/Tasks'
import Buckets from '../Buckets/Buckets';

const ToDo = () => {
    const loggedIn = getLoggedIn

    // Load initially then load again on subsequent changes to toDos
    // Using custom hooks from AddTaskContext to update context and state.


    if (getLoggedIn() === false) {
        return (
            <Redirect to='/login'/>
        )
    }
    
 
    return (
    <div className='page-config'>
        <div className='left-sidebar'>
            <div name='viewContainer'>
                <div className='left-sb-logo'>Views</div>
                <ul name='views' className='left-sb-navigation'>
                    <li name='dayView' className={'left-sb-element'} 
                    > Day </li>
                    <li name='weekView' className={'left-sb-element'}
                    > Week </li>
                    <li name ='timeblockView' className={'left-sb-element'}
                    > TimeBlock </li>
                </ul>
            </div>
            <div className='bucket-container' name='bucketContainer'>
                <Buckets/>
            </div>
        </div>
        <div className='main' id='main'>
            <div className='task-textedit'>
            <Tasks className='tasks'/>
            </div>
        </div>
    </div>
    )
}

export default ToDo
