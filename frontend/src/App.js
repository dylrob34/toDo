import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import cookie from 'react-cookies';
import { ToDoProvider } from './context/ToDoContext';
import { getToken, login, logout, setLoggedInCallback} from './context/loggedInState';
import { AddTaskProvider } from './context/AddTaskContext';
import {get} from "./tools/request";
import SignUp from './component/pages/SignUp/SignUp';
import { LoginPage } from './component/pages/Login/Login';
import NavBar from './component/layout/NavBar';
import ToDo from './component/pages/ToDo/ToDo';
import TimeBlock from './component/pages/TimeBlock/TimeBlock';
import Landing from './component/pages/About/Landing.jsx';
import Account from './component/pages/Account/Account.jsx';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Signup.css';
import './Tasks.css';
// import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';
import './AccountSetting.css';
import './Timeblock.css';
import './ToDo.css';
import './Landing.css';
import { TimeBlockProvider } from './context/TimeBlockContext';


const domain = process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";

function App() {
  // we workign?
  // Declare component states:
  const [loggedIn, setLoggedIn] = useState(false);
  const [team, setTeam] = useState("");
  setLoggedInCallback(setLoggedIn);

  // Cookie stores data on the persons computer
  var jwt = cookie.load("jwt")
  if (typeof jwt !== "undefined") {
    if (jwt !== "" && loggedIn === false) {
      login(jwt);
      get("/api/auth/checkLogin")
      .then((res) => {
          if (res.loggedIn === false) {
            logout(jwt);
            console.log("jwt is invalid");
          }
      })
    }
  }

  return (
    <Router>
      <div className="App">
        <NavBar setTeam={setTeam} />
        <Switch>
          <Route exact path='/' component={ Landing } />
          <Route exact path='/login' component={ LoginPage } />
          <Route exact path='/signup' component={ SignUp }></Route>
          <Route exact path='/account' component={ Account }></Route>
          <Route path='/todo' render={ routeProps => (
            <ToDoProvider>
              <AddTaskProvider>
                <ToDo {...routeProps}/>
              </AddTaskProvider>
            </ToDoProvider>
            )}></Route>
          <Route exact path='/capture'> </Route>
          <Route exact path='/timeblock' render={ routeProps => (
            <TimeBlockProvider>
              <TimeBlock {...routeProps} />
            </TimeBlockProvider>
           )}></Route>
        </Switch>
      </div>
    </Router>

  );

}

export default App;
export { domain, };
