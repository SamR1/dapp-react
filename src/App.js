import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home';


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">DAISEE</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="/">Home</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <br/><br/><br/>
              <div className="App-nav">
                  <Router>
                      <div>
                          <Route exact path="/" component={Home}/>
                      </div>
                  </Router>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
