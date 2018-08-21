import React from 'react';
import './style.less';
import { Row, Col, message } from 'antd';
import  { Link } from 'react-router-dom';
export default class InstallationHeader extends React.Component {
  state = {
    userName: '',
  }

  componentDidMount() {
    const userName = localStorage.getItem('userName');
    if(userName) {
      this.setState({
        userName: userName
      })
    }
  }

  // 退出登录
  handleLoginOut = () => {
    fetch('http://120.79.92.22/vmgr/user/v/cancellation', {
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
            document.getElementById('toLogin').click();
          }, 1000);
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
          <img src={require('./logo.jpg')} alt='' />
        </Col>
        {
          this.state.userName !== '' ? <Col span={6} offset={16} className='welcomeExit'>
            欢迎你， <span className='userName'>{this.state.userName}</span>
            <span className='exitLogin' onClick={this.handleLoginOut}>退出</span>
            <Link to='/codecraft/login' id='toLogin'></Link>
          </Col> : <Col span={6} offset={16} className='welcomeExit'>
              <span className='exitLogin'><Link to='/codecraft/login'>请登录</Link></span>
          </Col>
        }
      </Row>
    </div>
  }
}