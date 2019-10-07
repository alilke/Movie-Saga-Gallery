import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={Home}></Route>
          <Route path="/details/:id" render={(navProps) => (
            <Details
              match={navProps.match}
              history={navProps.history} />
          )}></Route>
          <Route path="/edit/:id" render={(navProps) => (
            <Edit
              match={navProps.match}
              history={navProps.history} />
          )}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
