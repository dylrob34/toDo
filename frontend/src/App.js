import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import cookie from 'react-cookies';
import { ToDoProvider } from './context/ToDoContext';
import { login, logout, setLoggedInCallback} from './context/loggedInState';
import { AddTaskProvider } from './context/AddTaskContext';
import {get} from "./tools/request";
import Landing from './component/pages/Landing';
import SignUp from './component/pages/SignUp';
import { LoginPage } from './component/pages/Login';
import NavBar from './component/layout/NavBar';
import ToDo from './component/pages/ToDo';
import TimeBlock from './component/pages/TimeBlock';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Signup.css';


const domain = "http://localhost"

function App() {
  
  // Declare component states:
  const [loggedIn, setLoggedIn] = useState(false);
  const [team, setTeam] = useState("");

  setLoggedInCallback(setLoggedIn);

  // Cookie stores data on the persons computer
  var jwt = cookie.load("jwt")
  if (typeof jwt !== "undefined") {
    if (jwt !== "") {
      get("/api/auth/checkLogin")
      .then((res) => {
          if (res.loggedIn === true) {
            login(jwt);
          } else {
            logout(jwt);
            console.log("jwt is invalid");
          }
      })
    }
  }

  return (
    <Router>
      <div className="App">
        <NavBar setTeam={setTeam}/>
        <Switch>
          <Route exact path='/' component={ Landing } />
          <Route exact path='/login' component={ LoginPage } />
          <Route exact path='/signup' component={ SignUp }></Route>
          <Route path='/todo' render={ routeProps => (
            <ToDoProvider>
              <AddTaskProvider>
                <ToDo {...routeProps}/>
              </AddTaskProvider>
            </ToDoProvider>
            )}>
          </Route>
          <Route exact path='/capture'> </Route>
          <Route exact path='/timeblock' component={ TimeBlock }></Route>
        </Switch>
      </div>
    </Router>

  );

}

export default App;
export { domain, };
