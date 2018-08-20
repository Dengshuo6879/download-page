import React from 'react';
import './style.less';
import { Row, Col } from 'antd';

export default class InstallationHeader extends React.Component {
  userName = '';
  componentDidMount() {
    const userName = localStorage.getItem('userName');
    console.log(userName);
    if(userName) {
      this.userName = userName;
    }
  }

  handleLoginOut = () => {
    // fetch('http://120.79.92.22:7888/vmgr/user/v/cancellation', {
    //   method: 'POST',
    //   hostname: '120.79.92.22',
    //   body: JSON.stringify(params),
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   }
    // }).then(res => {
    //   res.json().then(data => {
    //     // console.log(data);
    //     if (data.code === 1000) {
    //       message.success('登录成功');
    //       localStorage.setItem('userName', params.userName);
    //       setTimeout(() => {
    //         this.props.history.push('/codecraft')
    //       }, 1000)
    //     } else {
    //       message.error('登录失败');
    //     }
    //   })
    // });
  }

  render() {
    return <div className='pageHeader'>
      <Row>
        <Col span={2}>
          <img src={require('./logo.jpg')} />
        </Col>
        {
          this.userName ? <Col span={6} offset={16} className='welcomeExit'>
            欢迎你， <span className='userName'>{this.userName}</span>
            <span className='exitLogin' onClick={this.handleLoginOut}>退出</span>
          </Col> : <Col span={6} offset={16} className='welcomeExit'>
            <span className='exitLogin'>请登录</span>
          </Col>
        }
      </Row>
    </div>
  }
}