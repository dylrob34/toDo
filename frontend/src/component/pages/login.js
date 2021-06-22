import React from 'react'
import { Link, withRouter } from "react-router-dom"

const login = () => {
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

export default login
 