import React, {useState} from 'react';

import LoginForm from './component/pages/LoginForm';
import './App.css';

function App() {
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
    if (details.email === adminUser.email && details.password === adminUser.password) {
      console.log('You are Logged in!')
      // Once we've logged in we want to change the state of user with setUser method:
      setUser ({
        name: details.name,
        email: details.email
      })
    } else {
      console.log("The login information didn't match...")
      setError("The login information didn't match...")
    }
  }
  const userLogout = () => {
    console.log("Logged Out.")
    setUser({
      name:'',
      email:''
    })
  }
  
  return (
    <div className="App">
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
  );
}

export default App;
