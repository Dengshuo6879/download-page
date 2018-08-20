import React, { Component } from 'react';
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
  state = {
    bucket: ''
  }
  componentDidMount() {
    // 获取bucket
    // fetch('http://120.79.92.22/vmgr/cos/getCraftConfig', {
    //   method: 'GET',
    //   hostname: '120.79.92.22',
    //   port: 80,
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   }
    // }).then(res => {
    //   res.json().then(data => {
    //       if(data.code === 1000) {
    //         this.setState({ bucket: data.data.bucket })
    //       }
    //   })
    // });
  }

  render() {
    return (
      <div className="App">
        <InstallationHeader />
        <Router>
          <Switch>
            <Route path='/codecraft' exact component={InstallationManage} />
            <Route path='/codecraft/:type' exact component={EditPackage} />

            <Redirect to='/codecraft' />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
