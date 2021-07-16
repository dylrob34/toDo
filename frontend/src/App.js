import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import Landing from './component/Landing';
import SignIn from './component/pages/SignIn';

let domain = "localhost"

function App() {
  
 
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={ Landing }></Route>
          <Route exact path='/signin' component={ SignIn }></Route>
        </Switch>
      </div>
    </Router>

  );

}

export default App;
