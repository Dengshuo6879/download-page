import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InstallationManage from './pages/InstallationManage';
import PageHeader from './pages/PageHeader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PageHeader />
        <InstallationManage />
      </div>
    );
  }
}

export default App;
