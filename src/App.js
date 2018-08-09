import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import InstallationHeader from './container/InstallationHeader';
import InstallationManage from './container/InstallationManage';
import EditPackage from './container/EditPackage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <InstallationHeader />
        <Router>
          <Switch>
            <Route path='/' exact component={InstallationManage} />
            <Route path='/codecraft/:type' exact component={EditPackage} />

            <Redirect to='/' />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
