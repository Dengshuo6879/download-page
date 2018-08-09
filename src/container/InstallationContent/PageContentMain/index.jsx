import React from 'react';
import { Table, Progress, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

export default class PageContentMain extends React.Component {
  state = {
    title: '',
    modalVisible: false,
    content: '',
  }
  /**打开删除已发布的包 模态框 */
  handleDeletePublishedPackage = () => {
    this.setState({
      modalVisible: true,
      title: '提示',
      content: 'deletePublishedPackage'
    })
  }
  /**打开删除未发布的包 模态框 */
  handleDeleteUnPublishedPackage = () => {
    this.setState({
      modalVisible: true,
      title: '提示',
      content: 'deleteUnPublishedPackage'
    })
  }
  /**立即发布确认模态框 */
  handleConfirmPublishPackage = () => {
    this.setState({
      modalVisible: true,
      title: '提示',
      content: 'confirmPublishPackage'
    })
  }

  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
      title: '',
      content: ''
    })
  }
  render() {
    const columns = [{
      title: '安装包版本号',
      dataIndex: 'versionNo',
      key: 'versionNo',
      align: 'center'
    }, {
      title: '版本特性',
      dataIndex: 'description',
      key: 'description',
      align: 'center'
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      align: 'center'
    }, {
      title: '安装包属性',
      key: 'isForceUpdateStr',
      dataIndex: 'isForceUpdateStr',
      align: 'center'
    }, {
      title: '安装包类型',
      key: 'osTypeStr',
      dataIndex: 'osTypeStr',
      align: 'center',
      render: (text) => {
        if (text === 'mac') {
          return 'Mac'
        } else if (text === 'windows') {
          return 'Windows'
        }
      }
    }, {
      title: '安装包',
      key: 'package',
      dataIndex: 'package',
      align: 'center',
      render: (text) => {
        return <div>
          <Progress percent={50} size="small" status="active" style={{ display: 'inline' }} />
          <span className='blueTxt' className='marginRight10'>暂停</span>
          <span className='blueTxt' onClick={this.handleDeleteUnPublishedPackage}>删除</span>
        </div>
      }
    }, {
      title: '状态',
      key: 'isPublishStr',
      dataIndex: 'isPublishStr',
      align: 'center'
    }, {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      align: 'center',
      render: (text, record) => {
        return <div className='blueTxt'>
          <span className='blueTxt marginRight10' onClick={this.handleDeletePublishedPackage}>删除</span>
          <span className='blueTxt marginRight10'><Link to='/codecraft/edit'>编辑</Link></span>
          <span className='blueTxt marginRight10' onClick={this.handleConfirmPublishPackage}>立即发布</span>
        </div>
      }
    }];

    const data = [{
      key: 1,
      "id": 1,
      "versionNo": "v0.1",
      "osTypeStr": "mac",
      "isForceUpdateStr": "未强制更新",
      "isPublishStr": "未发布",
      "description": "增加了XXX能力，优化了XXX性能",
      "downloadKey": null,
      "fileSize": null,
      "fileEtag": null,
      "createTime": 1533625412000,
      "updateTime": "2018-08-07 15:03:34"
    }, {
      key: 2,
      "id": 2,
      "versionNo": "v0.0.6",
      "osTypeStr": "windows",
      "isForceUpdateStr": "未强制更新",
      "isPublishStr": "已发布",
      "description": "增加了XXX能力，优化了XXX性能",
      "downloadKey": null,
      "fileSize": null,
      "fileEtag": null,
      "createTime": 1533625412000,
      "updateTime": "2018-08-07 15:03:34"
    }];

    const { title, modalVisible, content } = this.state;

    const deletePublishedPackage = <span>删除该安装包后，该安装包将不在云端被比对的版本中，您确认删除？</span>;
    const confirmPublishPackage = <span>确认发布后，安装包将上传到云端，用户端将更新为此版本信息，您确认发布？</span>;
    const deleteUnPublishedPackage = <span>确认删除该安装包？</span>;
    return <div>
      <Table columns={columns} dataSource={data} bordered={true} />

      <Modal
        width={650}
        visible={modalVisible}
        title={title}
        onCancel={this.handleModalCancel}
        destroyOnClose={true}
        cancelText={'取消'}
        okText={'确定'}>
        {content === 'deletePublishedPackage' && deletePublishedPackage}
        {content === 'confirmPublishPackage' && confirmPublishPackage}
        {content === 'deleteUnPublishedPackage' && deleteUnPublishedPackage}
      </Modal>
    </div>
  }
}