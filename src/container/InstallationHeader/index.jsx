import React from 'react';
import './style.css';
import { Row, Col } from 'antd';

export default class PageHeader extends React.Component{
  render(){
    return <div className='pageHeader'>
      <Row>
        <Col span={2}><img src="./logo.jpg" alt=""/></Col>
        <Col span={6} offset={16} className='welcomeExit'>
          欢迎你， <span className='userName'>小鲁班</span>
          <span className='exitLogin'>退出</span>
        </Col>
      </Row>
    </div>
  }
}