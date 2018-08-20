import React from 'react';
import './style.less';
import { Row, Col, message } from 'antd';

export default class InstallationHeader extends React.Component {
  state = {
    userName: '',
  }

  componentWillReceiveProps() {
    const userName = localStorage.getItem('userName');
    if(userName) {
      this.setState({
        userName: userName
      }, () => {
        console.log(this.state.userName)
      })
    }
  }
  // 调至登录页
  toLogin = () => {
    console.log(this.props.history)
    this.props.history.push('/codecraft/login');
  }

  // 退出登录
  handleLoginOut = () => {
    fetch('http://120.79.92.22:7888/vmgr/user/v/cancellation', {
      method: 'POST',
      hostname: '120.79.92.22',
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(res => {
      res.json().then(data => {
        if (data.code === 1000) {
          message.success('退出登录');
          localStorage.removeItem('userName');
          setTimeout(() => {
            this.props.history.push('/codecraft/login');
          }, 1000)
        } else {
          message.error('退出失败');
        }
      })
    });
  }

  render() {
    return <div className='pageHeader'>
      <Row>
        <Col span={2}>
          <img src={require('./logo.jpg')} />
        </Col>
        {
          this.state.userName !== '' ? <Col span={6} offset={16} className='welcomeExit'>
            欢迎你， <span className='userName'>{this.state.userName}</span>
            <span className='exitLogin' onClick={this.handleLoginOut}>退出</span>
          </Col> : <Col span={6} offset={16} className='welcomeExit'>
            <span className='exitLogin' onClick={this.toLogin}>请登录</span>
          </Col>
        }
      </Row>
    </div>
  }
}