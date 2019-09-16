import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
}from 'react-router-dom';

// Import javascript files
import Login from './ViewLogin';
import Search from './ViewSearch';
import Result from './ViewResult';

function App() {
  return (
    // Router
    <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/search/:search" component={Result} />
            <Route path="/search" component={Search} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
