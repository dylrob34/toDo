import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const mymargin = {
    marginRight: "5px",
}

const LoginForm = ({ userLogin, error }) => {
        
    // Set Details:
        const [details, setDetails] = useState({email:'', password:''});
        // Function to handle on submit of the login button:
        const submitHandler = e => {
            e.preventDefault();
            // This calls the function defined in App.js and passes in details to it so that App.js can use it.
            userLogin(details);
        }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
            <h2>Login</h2>
                {(error !=="") ? ((<div className='error'>{error}</div>)) : ""}
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email"
                    // On change for event e, call setDetails pulling in what details already is + the value of the event (keystroke)
                    // then set the value of the state email in details to ...details + the new keystroke.
                    onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id='password' 
                    onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
            <input type="submit" value="LOGIN" style={mymargin}/>
            <Link to="/signup">Create Account</Link>
            </div>
        </form>
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