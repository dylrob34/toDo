import React, { useState } from 'react';

import LoginForm from './component/pages/LoginForm'
import Landing from './component/pages/Landing';
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
  }
  const userLogout = () => {
    console.log("Logged Out.")
  }

  // ====================================
  // Return:

  return (
    <LoginForm userLogin={userLogin} error={error} />
  );
}

export default App;
