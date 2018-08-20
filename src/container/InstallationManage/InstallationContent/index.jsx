import React from 'react';
import { stringify } from 'querystring';
import PageContentHeader from './PageContentHeader'
import PageContentMain from './PageContentMain';

export default class PageContent extends React.Component {
  state = {
    params: {},
    tableData:{},
  }

  onHeader = (ref) => {
    this.hander = ref;
  }
  onMain = (ref) => {
    this.main = ref;
  }
  componentDidMount () {
    this.hanldeGetTableDate();
    const userName = localStorage.getItem('userName');
    console.log(userName);
    if(!userName) {
      // this.props.history.push('/codecraft/login');
    }
  }

  // 获取table数据
  hanldeGetTableDate = () => {
    const formValues = this.hander.actionForm.getFieldsValue();
    const pageValues = this.main.state
    const param = this.state.params;
    param.versionNo = formValues.versionNo ? formValues.versionNo : null;
    param.isForceUpdate = (formValues.isForceUpdate && formValues.isForceUpdate !== 'all') ? parseInt(formValues.isForceUpdate) : null;
    param.osType = (formValues.osType && formValues.osType !== 'all') ? parseInt(formValues.osType) : null;
    param.isPublish = (formValues.isPublish === '0' || formValues.isPublish === '1') ? parseInt(formValues.isPublish) : null;
    param.pageNum = pageValues.pageNum;
    param.pageSize = pageValues.pageSize;
    this.setState({ params: param }, () => {
      const path = `http://120.79.92.22/vmgr/craft/v/craftPackages?${stringify(this.state.params)}`;
      fetch(path, {
        method: 'GET',
        hostname: '120.79.92.22',
        port: 80,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      }).then(res => {
        res.json().then(data => {
          if (data.code === 1000) {
            // console.log('table数据---', data.data)
            this.setState({ tableData: data.data })
          }
        })
      });
    });
  }

  render() {
    return <div>
      <PageContentHeader ref={this.onHeader} hanldeGetTableDate={this.hanldeGetTableDate}/>
      <PageContentMain 
        ref={this.onMain} 
        tableData={this.state.tableData} 
        hanldeGetTableDate={this.hanldeGetTableDate}
        formData={this.props.formData} 
        file={this.props.file}
      />
    </div>
  }
}