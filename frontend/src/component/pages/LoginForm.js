import React, { useState } from 'react';


function LoginForm( {userLogin, error} ) {
    // Local details those used for the form
    const [details, setDetails] = useState( { name:'', email:'', password:'' } );

    const submitHandler = e => {
        e.preventdefault();
        
        // Here we call the function userLogin (defined in App.js) and then we pass local details into it:
        userLogin(details)
    }


// ==========================================================================================================================
// Return:
    return (
        <div className="login-main">
            {(details.email !="") ? (
                <div className="welcome">
                    <h2>Welcome, <span>{details.name}</span></h2>
                    <button>Logout</button>
                </div>
            ) : (
                <form onSubmit={submitHandler}>
                    <h2>Login</h2>
                    {/*Error*/}
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id='password' />
                    </div>
                    <input type="submit" value="Login" />
                </form>
            )}
        </div>

    )
}
export default LoginForm
 


/* Vanilla HTML from the fisrt time I created a login page:
    <div>
        <h1>Anchor Weekly</h1>
        <div class="login-container">
            <h2 class="login-header">Log in:</h2>
                <input type="text" class="username">
                    <label class='username-label'>Username / Email</label>
                </input>
                <input type="text" class="password">
                    <label class='password-label'>Password</label>
                </input>
            <div class="submit">
                <button type="submit" class="login-btn">Login</button>
            </div>
            <div><Link href="#">Forgot Login</Link></div>
            <div class="join">
                <small>Don't have an account?</small>
                <button class="sign-up">Join the club</button>
            </div>
        </div>
    </div>
*/