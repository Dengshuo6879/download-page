import React from 'react';
import { Table } from 'antd';
import './style.css';

export default class PageContentMain extends React.Component {
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
      render: () => {
        return <div>获取文件</div>
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
        return <div className='blueTxt'>编辑</div>
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
    },
    ];
    return <div>
      <Table columns={columns} dataSource={data} bordered={true} align='center' />
    </div>
  }
}