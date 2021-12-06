import React, {useState} from 'react';
import {post} from "../../tools/request";
import { login } from "../../context/loggedInState";
import { Redirect } from 'react-router';
import { FaUnlock, FaLock, FaEnvelope, FaUserAlt } from 'react-icons/fa';

const SignUp = () => {

    const [hoverF, setHoverF] = useState()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [checkEmail, setCheckEmail] = useState('')

    const handleFNameChange = e => {
        setFirst(e.target.value)
        checkF()
    }
    const handleLNameChange = e => {
        setLast(e.target.value)
    }
    const handleEmailChange = e => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }
    
    const handleCheckPassword = e => {
        if ( e.target.value !== password ) {
            setPasswordError('The passwords do not match, please try again.')
        } else {
            setPasswordError('')
            console.log('Passwords Match')
        }
        setCheck(e.target.value)
    }

    const validateEmail = () => {
        if (email.includes("@")) {
            return true
        } else {
            setCheckEmail('invalid email')
            return false
        }
    }

    const submitSignUp = e => {
        e.preventDefault();
        
        // Dylan explain why I can't just have this if statement use validateEmail, and I have to set it equal to something.
        //const emailValid = validateEmail();
        if (validateEmail() === true) {
            console.log('No email errors')
            setCheckEmail('');
            setEmail('');
        }
        post("/api/user/createUser", {
            firstName: first,
            lastName: last,
            email,
            password,
            passCheck: check            
        })
        .then((resJson) => {
            if (resJson.loggedIn === true) {
                login(resJson.token);
                setRedirect(true);
            } else {
                console.log("Error Creating User");
            }
        });
        
    }

    const checkF = () => {
        if(first != '') {
            setHoverF(true)
        }
    }
    
    if (redirect === true) {
        return <Redirect to="/" />
    }

    return (
        <div className='signup-main'>

            <div className='signup-section pos-1'>
                <div>
                    <h1>Welcome to Blockz</h1>
                    <p> The building blocks for your productive life. </p>
                    <p> Build your productive life. One block at a time.</p>
                    <p> Build your productive life, one block at a time.</p>
                </div>
            </div>

            {(passwordError !=='') ? ((<div className='error'>{passwordError}</div>)) : ''}

            <div className='pos-2 signup-section'>
                <div className='signup-panel'>
                    <div className='signup-element-1'>
                        <div className='signup-item-1'>
                            <h3>Sign Up</h3>
                        </div>
                    </div>
                    <form>
                        <div className='signup-inputgroup'>
                            <div className={hoverF ? 'signup-element-2-hover' : 'signup-element-2'}>
                                <FaUserAlt className='signup-item-1'/>
                                <label htmlFor="fname" className='signup-item-1'>First Name: </label>
                            </div>
                            <div className='signup-element-3'>
                                <input
                                    onMouseEnter={() => setHoverF(true)}
                                    onMouseLeave={() => setHoverF(false)}
                                    className='signup-item-2'
                                    type='text' 
                                    name='fname' 
                                    id='fname' 
                                    value={first}
                                    onChange={ handleFNameChange }>
                                </input>
                            </div>
                        </div>
                        <div className='signup-element'>

                        </div>
                        <div className='signup-element'>

                        </div>
                        <div className='signup-element'>

                        </div>
                        <div className='signup-element'>

                        </div>
                    </form>
                </div>
            </div>

            <div className='signup-section pos-3'>
                <p>Already have an account?</p>
            </div>

        </div>
    )
}



    //     <div className='main-signup'>
    //         <div name='Welcome' className=''>
    //             <h1>Welcome to Blockz</h1>
    //             <p> The building blocks for your productive life. </p>
    //             <p> Build your productive life. One block at a time.</p>
    //             <p> Build your productive life, one block at a time.</p>
    //         </div>
    //         {(passwordError !=='') ? ((<div className='error'>{passwordError}</div>)) : ''}
             
    //         <form name='SignupForm' className="signup-panel">
    //             <h3 className='signup-item'> Sign Up</h3>
    //             <div className='signup-element'>
    //                 <div className='signup-item signup-label'> 
    //                     <FaUserAlt className='signup-item'/>
    //                     <label htmlFor="fname" className='signup-item'>First Name: </label>
    //                 </div>
    //                 <input type='text' name='fname' id='fname' value={first} className='signup-item form-input'
    //                 onChange={ handleFNameChange }
    //                 ></input>
    //             </div>
    //             <div className='signup-element'>
    //                 <div className='signup-item signup-label'> 
    //                     <FaUserAlt className='form-item' />
    //                     <label htmlFor="lname" className='form-item'>Last Name: </label>
    //                 </div>
    //                 <input type='text' name='lname' id='lname' placeholder='Your last name...' value={last} className='signup-item'
    //                 onChange={ handleLNameChange }
    //                 ></input>
    //             </div>
    //             <div className='signup-element'>
    //                 <div className='signup-item signup-label'> 
    //                     <FaEnvelope/>
    //                     <label htmlFor="email">Email: </label>
    //                 </div>
    //                 <input type='text' name='email' id='email' placeholder='Your Email...' value={email} className='signup-item'
    //                 onChange={ handleEmailChange }
    //                 ></input>
    //                 <div style={{fontSize: 12, color: 'red'}}>{checkEmail}</div>
    //             </div>
    //             <div className='signup-element'>
    //                 <div className='signup-item signup-label'> 
    //                     <FaUnlock/>
    //                     <label htmlFor="password">Create Password: </label>
    //                 </div>
    //                 <input type='password' name='password' id='password' placeholder='Create Password...' value={password} className='signup-item'
    //                 onChange={ handlePasswordChange }
    //                 ></input>
    //             </div>
    //             <div className='signup-element'>
    //                 <div className='signup-item signup-label'> 
    //                     <FaLock/>
    //                     <label htmlFor="confirmpassword">Confirm Password: </label>
    //                 </div>
    //                 <input type='password' name='confirmpassword' id='confirmpassword' placeholder='Confirm Password...' value={check} className='signup-item'
    //                 onChange={ handleCheckPassword }
    //                 ></input>
    //             </div>
    //             <div className='signup-element'>
    //                 <input type="submit" onClick={submitSignUp} className='btn-lg'/>
    //             </div>
    //         </form>
    //     </div>
export default SignUp

/*
1. Need to create a way to store users name DONE
2. Need to create a way to store users email DONE
3. Need to create a way to store users password DONE
4. Need to create a way to store users security question
5. Add error handling
6. Add a functon for handling submitting the form.
*/