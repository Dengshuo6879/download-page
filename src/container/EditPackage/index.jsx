import React from 'react';
import { Form, Button, Input, Select, Upload, Icon, message, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const { TextArea } = Input;
const Dragger = Upload.Dragger;
const Option = Select.Option;


class EditPackageForm extends React.Component {
  render() {
    const type = this.props.location.pathname.split('/')[2]; //获取路径

    const { getFieldDecorator } = this.props.form;
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
    const props = {
      name: 'file',
      multiple: true,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return <div style={{ padding: '30px 0 20px' }}>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={3} offset={5}>
          <span style={{ fontWeight: 'bold' }}>安装包管理</span> > <span style={{ fontWeight: 'bold'}}>{type === 'edit' ? '编辑' : '上传安装包'}</span>
        </Col>
      </Row>
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
            <Option value='mac'>Mac</Option>
            <Option value='windows'>Windows</Option>
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
            <Option value='force'>强制更新</Option>
            <Option value='unforce'>非强制更新</Option>
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
        {getFieldDecorator('installation', {
          rules: [{
            required: true,
          }]
        })(
          <div>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域进行添加</p>
              <p>（大小XXKB以内，XXX格式）</p>
            </Dragger>
          </div>
        )}
      </FormItem>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button style={{ marginRight: 50 }}><Link to='/'>取消</Link></Button>
        <Button type='primary'>提交</Button>
      </div>
    </div>
  }
}

const EditPackage = Form.create()(EditPackageForm);
export default EditPackage;