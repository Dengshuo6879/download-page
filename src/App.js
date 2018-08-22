import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { commonUrl } from './common/common';

import InstallationHeader from './container/InstallationHeader';
import InstallationManage from './container/InstallationManage';
import EditPackage from './container/EditPackage';
import Login from './container/Login';

class App extends Component {
  state = {
    bucket: ''
  }
  componentDidMount() {
    // 获取bucket
    // fetch(`${commonUrl}/cos/getCraftConfig`, {
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
    return (<LocaleProvider locale={zh_CN}>
      <div className="App">
        <Router>
          <Switch>
            <Route path='/codecraft/login' exact component={Login} />

            <div>
              <InstallationHeader />
              <Router>
                <Switch>
                  <Route path='/codecraft' exact component={InstallationManage} />
                  <Route path='/codecraft/:type' component={EditPackage} />
                </Switch>
              </Router>
            </div>

            <Redirect exact to='/codecraft/login' />

          </Switch>
        </Router>
      </div>
    </LocaleProvider>);
  }
}

export default App;
