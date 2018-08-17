/* eslint-disable */
import React from 'react';
import { Table, Progress, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import './style.less';

import COS from 'cos-js-sdk-v5';

const config = {
  Bucket: 'justfortest-1257175416',
  Region: 'ap-guangzhou'
};
const cos = new COS({
  getAuthorization: function (options, callback) {
    var method = (options.Method || 'get').toLowerCase();
    var key = options.Key || '';
    var query = options.Query || {};
    var headers = options.Headers || {};
    var pathname = key.indexOf('/') === 0 ? key : '/' + key;
    var url = 'http://120.79.92.22/vmgr/cos/getFileAuthorization';
    var xhr = new XMLHttpRequest();
    var data = {
      method: method,
      pathname: pathname,
      query: query,
      headers: headers,
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function (e) {
      try {
        var AuthData = JSON.parse(e.target.responseText);
        console.log(AuthData, '-----')
      } catch (e) {
        // ...
      }
      callback({
        Authorization: AuthData.Authorization,
        XCosSecurityToken: AuthData.XCosSecurityToken,
      });
    };

    xhr.send(JSON.stringify(data));
  }
});

export default class PageContentMain extends React.Component {

  state = {
    title: '',
    modalVisible: false,
    craftVerId: '',
    content: '',
    pageNum: 1,
    pageSize: 10,
    uploadProgress: {},

    taskId: 0,
    percent: 0,
    uploadSucc: false,
    puaseTask: false,
  }

  // 开始上传
  startUpload = (file) => {
    // const uploadProgress = this.state.uploadProgress;
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        cos.sliceUploadFile({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: file.name,
          Body: file,
          TaskReady: (taskId) => {
            // console.log('taskId--', taskId);
            // uploadProgress.taskId = taskId;
            this.setState({ taskId })
          },
          onProgress: (progressData) => {
            // console.log('onProgress', JSON.parse(JSON.stringify(progressData)).percent);
            const percent = JSON.parse(JSON.stringify(progressData)).percent;
            this.setState({ percent })


            // uploadProgress.percent = percent;
            // if(percent !== 1) {
            //   uploadProgress.progressVisible = true;
            // } else {
            //   uploadProgress.progressVisible = false;
            // }
            // console.log('uploadProgress----', uploadProgress)
            // this.setState({ uploadProgress });
          }
        }, (err, data) => {
          console.log(err || data);
        });
      } else {
        cos.putObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: file.name,
          Body: file,
          TaskReady: (taskId) => {
            // console.log('taskId---', taskId)
            this.setState({ taskId })
          },
          onProgress: (progressData) => {
            // console.log('onProgress', JSON.parse(JSON.stringify(progressData)).percent);
            const percent = JSON.parse(JSON.stringify(progressData)).percent;
            this.setState({ percent })

            // uploadProgress.percent = percent;
            // if (percent !== 1) {
            //   uploadProgress.progressVisible = true;
            // } else {
            //   uploadProgress.progressVisible = false;
            // }
            // console.log('uploadProgress----', uploadProgress)
            // this.setState({ uploadProgress })

          }
        }, (err, data) => {
          console.log(err || data);
          const params = {};
          params.craftVerId = this.props.formData.craftVerId;
          const osType = this.props.formData.osTypeStr === 'windows' ? '0' : this.props.formData.osTypeStr === 'mac' ? '1' : null;
          const fileName = file.name;
          params.key = `${osType}/${fileName}`;

          if (err) {
            console.log('upload err -----')
            this.setState({ uploadSucc: false });
            params.uploadStatus = '0';
          } else {
            console.log('upload suc')
            this.setState({ uploadSucc: true });
            params.uploadStatus = '1';
          }

          console.log(params, '--------')
          // 上传的回调
          fetch('http://120.79.92.22:7888/vmgr/craft/craftCallback', {
            method: 'POST',
            hostname: '120.79.92.22',
            port: 7888,
            body: JSON.stringify(params),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            }
          }).then(res => {
            res.json().then(data => {
              console.log(data);
              if (data.code === 1000) {
                message.success('上传成功');
                this.setState({ modalVisible: false })
                this.props.hanldeGetTableDate();
              } else {
                message.error('上传失败');
              }
            })
          });
        });
      }
    }
  }
  // 暂停任务
  pauseTask = (taskId) => {
    cos.pauseTask(taskId);
    this.setState({ puaseTask: true })
  }
  // 重新开始任务
  restartTask = (taskId) => {
    cos.restartTask(taskId);
    this.setState({
      uploadSucc: false,
      puaseTask: false,
    })
  }

  componentDidMount() {
    console.log(this.props.formData, 'formdata------');
    console.log(this.props.file, 'file------');

    if (this.props.file.name) {
      this.startUpload(this.props.file);
    }
  }

  // 打开删除已发布的包 模态框
  handleDeletePublishedPackage = (record) => {
    this.setState({
      modalVisible: true,
      title: '提示',
      content: 'deletePublishedPackage',
      craftVerId: record.craftVerId
    })
  }
  // 打开删除未发布的包 模态框
  handleDeleteUnPublishedPackage = () => {
    this.setState({
      modalVisible: true,
      title: '提示',
      content: 'deleteUnPublishedPackage'
    })
  }
  // 立即发布确认模态框
  handleConfirmPublishPackage = (record) => {
    this.setState({
      modalVisible: true,
      title: '提示',
      content: 'confirmPublishPackage',
      craftVerId: record.craftVerId
    })
  }

  // modal取消
  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
      title: '',
      content: ''
    })
  }

  // 确认删除
  handleDelete = () => {
    const params = {};
    params.craftVerId = this.state.craftVerId
    fetch(`http://120.79.92.22:7888/vmgr/craft/craftPackage`, {
      method: 'DELETE',
      hostname: '120.79.92.22',
      port: 7888,
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    }).then(res => {
      res.json().then(data => {
        if (data.code === 1000) {
          message.success('删除成功');
          this.setState({ modalVisible: false })
          this.props.hanldeGetTableDate();
        } else {
          message.error('删除失败');
        }
      })
    });
  }
  // 确认发布
  handlePublish = () => {
    const params = {};
    params.craftVerId = this.state.craftVerId
    console.log(params);
    // 发起请求
    fetch('http://120.79.92.22:7888/vmgr/craft/craftPublish', {
      method: 'POST',
      hostname: '120.79.92.22',
      port: 7888,
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    }).then(res => {
      res.json().then(data => {
        // console.log(data);
        if (data.code === 1000) {
          message.success('发布成功');
          this.setState({ modalVisible: false })
          this.props.hanldeGetTableDate();
        } else {
          message.error('发布失败');
        }
      })
    });
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
      render: (text, record) => {
        // console.log('record----', record)
        // console.log(this.state.percent)
        return <div className='pageContentMain'>
          {record.isPublish === 0 && <div>

            {this.props.formData.craftVerId === record.craftVerId && <div>
              {this.state.percent < 1 ?
                this.state.puaseTask ? <div>
                  <span className='greyTxt marginRight10'>已暂停</span><span className='blueTxt' onClick={() => this.restartTask(this.state.taskId)}>继续上传</span>
                </div> : <div>
                    <Progress percent={parseInt(this.state.percent * 100)} size="small" status="active" style={{ display: 'inline' }} />
                    <span className='blueTxt marginRight10' onClick={() => this.pauseTask(this.state.taskId)}>暂停</span>
                  </div>
                :
                this.state.uploadSucc ? <div>
                  <span className='marginRight10'>上传成功</span><span className='blueTxt' onClick={() => this.startUpload(this.props.file)}>重新上传</span>
                </div> : <div>
                    <span className='redTxt marginRight10'>上传失败</span><span className='blueTxt' onClick={() => this.startUpload(this.props.file)}>重新上传</span>
                  </div>
              }

            </div>}
            {this.props.formData.craftVerId !== record.craftVerId && <span className='blueTxt'>开始上传</span>}
          </div>}
          {record.isPublish === 1 && <div>---</div>}
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
        // console.log(record, '-=-=-=-=-=-=-=')
        return <div className='blueTxt'>
          {record.isPublish === 0 && <span>
            <span className='blueTxt marginRight10'><Link to='/codecraft/edit'>编辑</Link></span>
            {this.state.uploadSucc && this.props.formData.craftVerId === record.craftVerId && <span className='blueTxt marginRight10' onClick={() => this.handleConfirmPublishPackage(record)}>立即发布</span>}
          </span>}
          <span className='blueTxt marginRight10' onClick={() => this.handleDeletePublishedPackage(record)}>删除</span>
        </div>
      }
    }];

    const data = this.props.tableData.rows;

    const { title, modalVisible, content } = this.state;

    const deletePublishedPackage = <span>删除该安装包后，该安装包将不在云端被比对的版本中，您确认删除？</span>;
    const confirmPublishPackage = <span>确认发布后，安装包将上传到云端，用户端将更新为此版本信息，您确认发布？</span>;
    const deleteUnPublishedPackage = <span>确认删除该安装包？</span>;

    const tableParam = {
      columns: columns,
      dataSource: data,
      bordered: true,
      pagination: {
        showQuickJumper: true,
        total: this.props.tableData.total,
        onChange: (arg) => {
          this.setState({
            pageNum: arg
          }, () => {
            this.props.hanldeGetTableDate();
          })
        }
      }
    };
    return <div>
      <Table {...tableParam} />

      <Modal
        width={650}
        visible={modalVisible}
        title={title}
        onCancel={this.handleModalCancel}
        onOk={
          content === 'deletePublishedPackage' ? this.handleDelete : content === 'confirmPublishPackage' ? this.handlePublish : null
        }
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