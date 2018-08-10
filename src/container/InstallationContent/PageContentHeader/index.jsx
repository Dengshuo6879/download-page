import React from 'react';
import { Row, Col, Button, Select, Input, Icon } from 'antd';
import ActionForm from '../../../component/ActiveForm';

import { Link } from 'react-router-dom';
import './style.less';
const Option = Select.Option;

export default class PageContentHeader extends React.Component {
  render() {
    const obj = [{
      type: 'input',
      defaultValue: null,
      labelTxt: 'oversion',
      placeholder: '请输入安装包版本号',
    }, {
      type: 'select',
      defaultValue: 'all',
      labelTxt: 'isForce',
      opt: [{
        val: 'all',
        txt: '全部属性',
      }, {
        val: 'force',
        txt: '强制升级',
      }, {
        val: 'unforce',
        txt: '非强制升级'
      }]
    }, {
      type: 'select',
      defaultValue: 'all',
      labelTxt: 'osType',
      opt: [{
        val: 'all',
        txt: '全部类型'
      }, {
        val: 'mac',
        txt: 'Mac'
      }, {
        val: 'windows',
        txt: 'Windows'
      }]
    }, {
      type: 'select',
      defaultValue: 'all',
      labelTxt: 'status',
      opt: [{
        val: 'all',
        txt: '全部状态'
      }, {
        val: 'pub',
        txt: '已发布'
      }, {
        val: 'unpub',
        txt: '未发布'
      }, {
        val: 'del',
        txt: '已删除'
      }]
    }];
    const layout = 'inline';
    return <div style={{marginBottom: '20px'}}>
      <Row>
        <Col span={18}>
          <ActionForm obj={obj} layout={layout}/>
        </Col>

        <Col span={2} offset={4}>
          <Button type="primary" ghost><Icon type="plus" /><Link to='/codecraft/upload'>上传安装包</Link></Button>
        </Col>
      </Row>
    </div>
  }
}