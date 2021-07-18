import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import './App.css';
import Landing from './component/Landing';
import SignUp from './component/pages/SignUp';
import { login, logout, setLoggedInCallback} from './loggedInState';
import cookie from 'react-cookies';
import LoginForm from './component/pages/LoginForm';

const domain = "localhost"

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);

  setLoggedInCallback(setLoggedIn);

  var jwt = cookie.load("jwt")
  if (typeof jwt !== "undefined") {
    if (jwt !== "") {
      fetch("https://" + domain + "/api/auth/checkLogin", {
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
        <Switch>
          <Route exact path='/' >
            {(loggedIn === true) ? (
                <Landing name="test" email="test@test.com" loggedIn={true} />
            ) : (
                <Landing name="test" email="test@test.com" loggedIn={false} />
            )}
          </Route>
          <Route exact path='/signin' component={ SignUp }></Route>
        </Switch>
      </div>
    </Router>

  );

}

export default App;
export { domain, };
