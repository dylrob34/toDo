import React, {useState} from 'react';
import { domain } from "../../App";
import { login } from "../../loggedInState";
import { Redirect } from 'react-router';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [redirect, setRedirect] = useState(false);


    const handleFNameChange = e => {
        setFirst(e.target.value)
    }
    const handleLNameChange = e => {
        setLast(e.target.value)
    }
    const handleEmailChange = e => {
        setEmail(e.target.value)
    }

    // const handleCheckEmail = e => {
    //     if ( e.target.value !== )

    // }

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

    const submitSignUp = e => {
        e.preventDefault();
        
        fetch("http://" + domain + "/api/user/createUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"          
        },
        body: JSON.stringify({
            firstName: first,
            lastName: last,
            email,
            password,
            passCheck: check            
        })
      })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.loggedIn === true) {
          login(resJson.token);
          setRedirect(true);
        } else {
          console.log("Error Creating User");
        }
      });
        
    }
    
    if (redirect === true) {
        return <Redirect to="/" />
    }

    return (
        <form>
            <h1>Create Your Account</h1>
            {(passwordError !=='') ? ((<div className='error'>{passwordError}</div>)) : ''}
            <div>
                <label htmlFor="fname">First Name: </label>
                <input type='text' name='fname' id='fname' placeholder='Your first name...' value={first}
                onChange={ handleFNameChange }
                ></input>
            </div>
            <div>
                <label htmlFor="lname">Last Name: </label>
                <input type='text' name='lname' id='lname' placeholder='Your last name...' value={last}
                onChange={ handleLNameChange }
                ></input>
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type='text' name='email' id='email' placeholder='Your Email...' value={email}
                onChange={ handleEmailChange }
                ></input>
            </div>
            <div>
                <label htmlFor="password">Create Password: </label>
                <input type='password' name='password' id='password' placeholder='Create Password...' value={password}
                onChange={ handlePasswordChange }
                ></input>
            </div>
            <div>
                <label htmlFor="confirmpassword">Confirm Password: </label>
                <input type='password' name='confirmpassword' id='confirmpassword' placeholder='Confirm Password...' value={check}
                onChange={ handleCheckPassword }
                ></input>
            </div>
            <input type="submit" onClick={submitSignUp}/>

        </form>
    )
}

export default SignUp

/*
1. Need to create a way to store users name DONE
2. Need to create a way to store users email DONE
3. Need to create a way to store users password DONE
4. Need to create a way to store users security question
5. Add error handling
6. Add a functon for handling submitting the form.
*/