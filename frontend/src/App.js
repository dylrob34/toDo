import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import './App.css';
import Landing from './component/pages/Landing';
import SignUp from './component/pages/SignUp';
import { login, logout, setLoggedInCallback} from './loggedInState';
import cookie from 'react-cookies';
import { LoginPage } from './component/pages/Login';
import NavBar from './component/layout/NavBar';
import ToDo from './component/pages/ToDo';


const domain = "localhost"

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);

  setLoggedInCallback(setLoggedIn);

  var jwt = cookie.load("jwt")
  if (typeof jwt !== "undefined") {
    if (jwt !== "") {
      fetch("http://" + domain + "/api/auth/checkLogin", {
        method: "GET",
        headers: {
          Accept: "application/json",
          authorization: "bearer " + jwt
        }
      })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.loggedIn === true) {
          login(jwt);
        } else {
          console.log("jwt is invalid");
        }
      });
    }
  }
 
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={ Landing } />
          <Route exact path='/login' component={ LoginPage } />
          <Route exact path='/signup' component={ SignUp }></Route>
          <Route exact path='/todo' component={ ToDo }></Route>
        </Switch>
      </div>
    </Router>

  );

}

export default App;
export { domain, };
