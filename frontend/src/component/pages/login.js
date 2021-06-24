import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom"


    function Login() {
        const [ email, setEmail ] = useState(""); // email set to "" and setEmail is the method that lets you adjust state...
        const [ password, setPassword] = useState("");
        const [error, setError] = useState("");

        const submitForm = () => {
            if(email==='' || password === '') {
                setError('Fields are required...');
                return;
            };
            props.login({email, password}) // TODO: Need to make a reducer method that 
        };

    // This part might just be a component with html and css that I call into the App level component:
    return (
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
    )
}
export default Login
 