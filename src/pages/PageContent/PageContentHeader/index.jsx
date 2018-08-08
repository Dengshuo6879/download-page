import React from 'react';
import { Row, Col, Button, Select, Input, Icon } from 'antd';
import './style.css';
const Option = Select.Option;

export default class PageContentHeader extends React.Component {
  render() {
    return <div style={{marginBottom: '20px'}}>
      <Row>
        <Col span={18}>
          <Input placeholder={'请输入安装包版本号'} className='version marginRight20'/>
          <Select defaultValue='all' className='marginRight20'>
            <Option value='all'>全部属性</Option>
            <Option value='force'>强制升级</Option>
            <Option value='unforce'>非强制升级</Option>
          </Select>
          <Select defaultValue='all' className='marginRight20'>
            <Option value='all'>全部类型</Option>
            <Option value='mac'>Mac</Option>
            <Option value='win'>Windows</Option>
          </Select>
          <Select defaultValue='all' className='marginRight40'>
            <Option value='all'>全部状态</Option>
            <Option value='published'>已发布</Option>
            <Option value='unPublished'>未发布</Option>
            <Option value='delete'>已删除</Option>
          </Select>
          <Button type='primary'>查找</Button>
        </Col>

        <Col span={2} offset={4}>
          <Button type="primary" ghost><Icon type="plus"/>上传安装包</Button>
        </Col>
      </Row>
    </div>
  }
}