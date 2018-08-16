/* eslint-disable */
import React from 'react';
import { Table, Progress, Modal, message } from 'antd';
import { stringify } from 'querystring';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import './style.less';

import COS from 'cos-js-sdk-v5';
// import fs from 'fs';

const fs = require('fs');

const config = {
    Bucket: 'justfortest-1257175416',
    Region: 'ap-guangzhou'
};
// const cos = new COS({
//     getAuthorization: function (options,callback) {
//           var method = (options.Method || 'get').toLowerCase();
//           var key = options.Key || '';
//           var query = options.Query || {};
//           var headers = options.Headers || {};
//           var pathname = key.indexOf('/') === 0 ? key : '/' + key;
//           var url = 'http://120.79.92.22/vmgr/cos/getFileAuthorization';
//           var xhr = new XMLHttpRequest();
//           var data = {
//               method: method,
//               pathname: pathname,
//               query: query,
//               headers: headers,
//           };
//           xhr.open('POST', url, true);
//           xhr.setRequestHeader('content-type', 'application/json');
//           xhr.onload = function (e) {
//               try {
//                   var AuthData = JSON.parse(e.target.responseText);
//                   console.log(AuthData, '-----')
//               } catch (e) {

//               }
//               callback({
//                   Authorization: AuthData.Authorization,
//                   XCosSecurityToken: AuthData.XCosSecurityToken,
//               });
//           };
          
//           xhr.send(JSON.stringify(data));
//     }
// });

// //暂停任务
// function pauseTask(taskId) {
//     cos.pauseTask(taskId);
// }

// //开始任务
// function restartTask(taskId) {
//     cos.restartTask(taskId);
// }

// //上传文件
// function startUpload() {
// 	var input = document.createElement('input');
//     input.type = 'file';
//     input.onchange = function (e) {
//         var file = this.files[0]
//         if (file) {
        	 	
//         	var progressId = 8996;
        	
//             if (file.size > 100 * 1024 * 1024) {
//                 cos.sliceUploadFile({
//                     Bucket: config.Bucket, 
//                     Region: config.Region,
//                     Key: file.name,
//                     Body: file,
//                   TaskReady: function (taskId) {
//                       // var TaskId = tid;
//                       console.log(taskId)
//                       // appendUploadFile(file.name, progressId, file.size);
                        
//                     },
//                     onHashProgress: function (progressData) {
//                         //console.log('onHashProgress', JSON.stringify(progressData));
//                     },
//                     onProgress: function (progressData) {
//                     	console.log('onProgress', JSON.stringify(progressData));
//                     	// $("#progress" + progressId).css("width", parseInt(progressData.percent * 10000) / 100 + "%");
//                     }
//                 }, function (err, data) {
//                     console.log(err || data);
//                 });
//             } else {
//                 cos.putObject({
//                     Bucket: config.Bucket,
//                     Region: config.Region,
//                     Key: file.name,
//                     Body: file,
//                     TaskReady: function (taskId) {
//                       console.log(taskId)
//                         // appendUploadFile(file.name, progressId, file.size);                    
//                     },
//                     onProgress: function (progressData) {
//                         console.log('onProgress', JSON.stringify(progressData));
//                         // $("#progress" + progressId).css("width", parseInt(progressData.percent * 10000) / 100 + "%");
//                     }
//                 }, function (err, data) {
//                     console.log(err || data);
//                 });
//             }
//         }
//     };
//     input.click();
// }




export default class PageContentMain extends React.Component {

  state = {
    title: '',
    modalVisible: false,
    craftVerId: '',
    content: '',
    pageNum: 1,
    pageSize: 10,
  }

  componentDidMount() {
    // console.log(this.props.formData, '------');
    // console.log(this.props.fileSize, '------');
    // id: "1030018849253552129"  fileName: 'QQ9.0.5.exe'  fileSize: 75172728
    // startUpload();
    console.log('fs----', fs)
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
  handleConfirmPublishPackage = () => {
    this.setState({
      modalVisible: true,
      title: '提示',
      content: 'confirmPublishPackage'
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
        return <div>
          {record.isPublish === 0 ? <div>
            <Progress percent={50} size="small" status="active" style={{ display: 'inline' }} />
            <span className='blueTxt' className='marginRight10'>暂停</span>
          </div> : <div>---</div> }
         
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
        console.log(record, '-=-=-=-=-=-=-=')
        return <div className='blueTxt'>
          {record.isPublish === 0 && <span>
            <span className='blueTxt marginRight10'><Link to='/codecraft/edit'>编辑</Link></span>
            <span className='blueTxt marginRight10' onClick={this.handleConfirmPublishPackage}>立即发布</span>
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
        onChange: (arg)=> {
          this.setState({
            pageNum: arg
          }, () => {
          this.props.hanldeGetTableDate();
          })
        }
      }
    };
    return <div>
      <Table {...tableParam}/>

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