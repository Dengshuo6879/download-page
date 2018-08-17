import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import ActionForm from '../../../../component/ActiveForm';

import { Link } from 'react-router-dom';
import './style.less';

export default class PageContentHeader extends React.Component {

  onActiveForm = (ref) => {
    this.actionForm = ref;
  }

  render() {
    const obj = [{
      type: 'input',
      defaultValue: null,
      labelTxt: 'versionNo',
      placeholder: '请输入安装包版本号',
    }, {
      type: 'select',
      defaultValue: 'all',
      labelTxt: 'isForceUpdate',
      opt: [{
        val: 'all',
        txt: '全部属性',
      },{
        val: '1',
        txt: '强制升级',
      }, {
        val: '0',
        txt: '非强制升级'
      }]
    }, {
      type: 'select',
      defaultValue: 'all',
      labelTxt: 'osType',
      opt: [{
        val: 'all',
        txt: '全部类型',
      },{
        val: '1',
        txt: 'Mac'
      }, {
        val: '0',
        txt: 'Windows'
      }]
    }, {
      type: 'select',
      defaultValue: 'all',
      labelTxt: 'isPublish',
      opt: [{
        val: 'all',
        txt: '全部状态'
      }, {
        val: '1',
        txt: '已发布'
      }, {
        val: '0',
        txt: '未发布'
      }]
    }];
    const layout = 'inline';
    return <div style={{marginBottom: '20px'}}>
      <Row>
        <Col span={18}>
          <ActionForm obj={obj} layout={layout} ref={this.onActiveForm} hanldeGetTableDate={this.props.hanldeGetTableDate} />
        </Col>

        <Col span={2} offset={4}>
          <Button type="primary" ghost><Icon type="plus" /><Link to='/codecraft/upload'>上传安装包</Link></Button>
        </Col>
      </Row>
    </div>
  }
}