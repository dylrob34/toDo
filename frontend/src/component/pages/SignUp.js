import React, {useState} from 'react'

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = e => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }

    return (
        <form>
            <h1>Create Your Account</h1>
            <div>
                <label htmlFor="email">Email: </label>
                <input type='text' name='email' id='email' placeholder='Your Email...' value={email}
                onChange={ handleEmailChange }
                ></input>
            </div>
            <div>
                <label htmlFor="password">Create Password: </label>
                <input type='text' name='password' id='password' placeholder='Create Password...' value={password}
                onChange={ handlePasswordChange }
                ></input>
            </div>
            <input type="submit" />
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