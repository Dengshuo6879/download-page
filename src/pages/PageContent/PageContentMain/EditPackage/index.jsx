import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;


class EditPackageForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
      },
    };
    return <div>
      <FormItem
        {...formItemLayout}
        label="安装包类型"
      >
        {getFieldDecorator('osType', {
          rules: [{
            required: true,
          }]
        })(
          <Input disabled />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="安装包属性"
      >
        {getFieldDecorator('isForceUpdate', {
          rules: [{
            required: true,
          }]
        })(
          <Input disabled />
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
            <TextArea rows={4} placeholder='请输入安装包特性' />
            <p style={{ marginTop: '-7px', marginBottom: '-10px' }}>同一安装包类型下的版本号不能重复</p>
          </div>
        )}
      </FormItem>
    </div>
  }
}

const EditPackage = Form.create()(EditPackageForm);
export default EditPackage;