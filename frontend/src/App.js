import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import './App.css';
import Landing from './component/pages/Landing';
import SignUp from './component/pages/SignUp';
import { login, setLoggedInCallback} from './context/loggedInState';
import cookie from 'react-cookies';
import { LoginPage } from './component/pages/Login';
import NavBar from './component/layout/NavBar';
import ToDo from './component/pages/ToDo';
import { AddTaskProvider } from './context/AddTaskContext';
import {get} from "./tools/request";
import { ToDoProvider } from './context/ToDoContext';

const domain = "localhost"

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [team, setTeam] = useState("");

  setLoggedInCallback(setLoggedIn);

  var jwt = cookie.load("jwt")
  if (typeof jwt !== "undefined") {
    if (jwt !== "") {
      get("/api/auth/checkLogin")
      .then((res) => {
          if (res.loggedIn === true) {
            login(jwt);
          } else {
            console.log("jwt is invalid");
          }
      })
    }
  }
  return (
    <Router>
      <AddTaskProvider>
      <div className="App">
        <NavBar setTeam={setTeam}/>
        <Switch>
          <Route exact path='/' component={ Landing } />
          <Route exact path='/login' component={ LoginPage } />
          <Route exact path='/signup' component={ SignUp }></Route>
          <Route path='/todo' render={ routeProps => (
            <ToDoProvider>
              <ToDo {...routeProps}/>
            </ToDoProvider>
            )}>

          </Route>
        </Switch>
      </div>
      </AddTaskProvider>
    </Router>

  );

}

export default App;
export { domain, };
