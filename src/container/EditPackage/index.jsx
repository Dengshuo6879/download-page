import React from 'react';
import { Form, Button, Input, Select, Upload, Icon, message, Row, Col } from 'antd';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import "whatwg-fetch"

import axios from 'axios';
const FormItem = Form.Item;
const { TextArea } = Input;
const Dragger = Upload.Dragger;
const Option = Select.Option;


class EditPackageForm extends React.Component {
  state = {
    filePath: ''
  }
  handleSubmit = () => {
    const { getFieldsValue, validateFields, setFieldsValue } = this.props.form;
    validateFields(
      (err) => {
        if (!err) {
          const params = { ...getFieldsValue() };

          const filePath = getFieldsValue()['filename'];
          this.setState({ filePath });
          const fileNames = filePath.split('\\');
          const fileName = fileNames[fileNames.length - 1];
          console.log(fileName)
          params.osType = parseInt(params.osType);
          params.isForceUpdate = parseInt(params.isForceUpdate);
          params.filename = fileName;

          console.log(params);
          // const jsonStringify = JSON.stringify(params)
          axios.post("http://120.79.92.22:7888/vmgr/craft/craftPackage",{params}).then(res=>{
            console.log("56789")
          })
          // fetch('http://120.79.92.22:7888/vmgr/craft/craftPackage', {
          //   method: 'put',
          //   body: params,
          //   headers: {
          //     'Accept': 'application/json',
          //     'Content-Type': 'application/x-www-form-urlencoded'
          //   },  
          //   headers: {
          //     "Content-Type": "application/x-www-form-urlencoded"
          //   }
          // })
          //   .then(response => response.json())
          //   .catch(error => console.error('Error:', error))
          //   .then(response => console.log('Success:', response));
        }
      },
    );
  }

  showInfo = () => {
    const path = $('#file').val();
    var pos1 = path.lastIndexOf('/');
    var pos2 = path.lastIndexOf('\\');
    var pos = Math.max(pos1, pos2)
    if (pos < 0) {
      return path;
    } else {
      return path.substring(pos + 1);
    }
  }

  render() {
    const type = this.props.location.pathname.split('/')[2]; //获取路径

    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    // const props = {
    //   name: 'file',
    //   multiple: false,
    //   // action: '//jsonplaceholder.typicode.com/posts/',
    //   onChange(info) {
    //     // setFieldsValue({filename: info.file.name});

    //   },
    //   beforeUpload: () => {
    //     return this.handleSubmit;
    //   }
    // };
    return <div style={{ padding: '30px 0 20px' }}>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={3} offset={5}>
          <span style={{ fontWeight: 'bold' }}>安装包管理</span> > <span style={{ fontWeight: 'bold' }}>{type === 'edit' ? '编辑' : '上传安装包'}</span>
        </Col>
      </Row>
      <Form>
        <FormItem
          {...formItemLayout}
          label="安装包类型"
        >
          {getFieldDecorator('osType', {
            rules: [{
              required: true,
            }],
            initialValue: type === 'edit' ? 'mac' : null
          })(
            <Select style={{ width: '100%' }}>
              <Option value='0'>Windows</Option>
              <Option value='1'>Mac</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="安装包属性"
        >
          {getFieldDecorator('isForceUpdate', {
            rules: [{
              required: true,
            }],
            initialValue: type === 'edit' ? 'force' : null
          })(
            <Select style={{ width: '100%' }}>
              <Option value='0'>非强制更新</Option>
              <Option value='1'>强制更新</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="安装版本号"
        >
          {getFieldDecorator('versionNo', {
            rules: [{
              required: true,
            }]
          })(
            <div>
              <Input placeholder='请输入安装包版本号' />
              <p style={{ marginTop: '-10px', marginBottom: '-10px' }}>同一安装包类型下的版本号不能重复</p>
            </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="安装包特性"
        >
          {getFieldDecorator('description', {
            rules: [{
              required: true,
            }]
          })(
            <div>
              <TextArea rows={4} placeholder='请输入安装包描述' />
            </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={type === 'edit' ? '安装包' : '添加安装包'}
        >
          {getFieldDecorator('filename', {
            rules: [{
              required: true,
            }]
          })(
            <div>
              {/* <Dragger {...props} disabled={this.state.disabled}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此区域进行添加</p>
                <p>（大小XXKB以内，XXX格式）</p>
              </Dragger> */}
              <input type='file' name='file' id='file' />
            </div>
          )}
        </FormItem>
        <FormItem>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Button style={{ marginRight: 50 }}><Link to='/'>取消</Link></Button>
            <Button type='primary' htmlType="submit" onClick={this.handleSubmit}>提交</Button>
          </div>
        </FormItem>
      </Form>


    </div>
  }
}

const EditPackage = Form.create()(EditPackageForm);
export default EditPackage;