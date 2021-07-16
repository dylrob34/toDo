import React, {useState} from 'react'
import LoginForm from './pages/LoginForm'

const Landing = () => {
// Test user to test against:
const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  };

  // Variable sets until they are moved to Login state:
  const [user, setUser] = useState({name:'', email:''});
  const [error, setError] = useState("");

  // Method creation until they are moved to a Login state:
  const userLogin = details => {
    console.log(details);

    //Added by Dylan to authenticate from backend
    fetch("http://" + domain + "/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: details.email,
        pass: details.password
      })
    })
    .then((res) => res.json())
    .then((resJson) => {
      if (resJson.error === true) {
        console.log("The login information didn't match...");
        setError("The login information didn't match...");
      } else if (resJson.login === true) {
        setUser({
          name: resJson.name,
          email: details.email
        })
      }
    })
  }
  const userLogout = () => {
    console.log("Logged Out.")
    setUser({
      name:'',
      email:''
    })
  }


    return (
        <div className="landing">
            {(user.email !=='') ? (
                <div className="welcome">
                <h2>Welcome, <span>{user.name}</span></h2>
                <button onClick={userLogout}>Logout</button>
                </div>
            ) : (
                <LoginForm userLogin={userLogin} error={error} />
            )
            }
        </div>
    )
}

export default Landing

