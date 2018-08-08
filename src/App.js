import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InstallationManage from './pages/InstallationManage';
import Header from './pages/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <InstallationManage />
      </div>
    );
  }
}

export default App;
