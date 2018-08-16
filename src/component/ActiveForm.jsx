import React from 'react';
import { Form, Button, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class ActiveFormForm extends React.Component {
  handleSubmit = () => {
    this.props.hanldeGetTableDate();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 0 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
    };

    return <div>
      <Form layout={this.props.layout}>
        {this.props.obj.map((items, index) => {
          if (items.type === 'input') {
            return <FormItem key={index}
              {...formItemLayout}
            >
              {getFieldDecorator(items.labelTxt, {
                initialValue: items.defaultValue ? items.defaultValue : null,
              })(
                <Input placeholder={items.placeholder} style={{ width: 'auto' }} />
              )}
            </FormItem>
          } else if (items.type === 'select') {
            return <FormItem key={index}
              {...formItemLayout}
            >
              {getFieldDecorator(items.labelTxt, {
                initialValue: items.defaultValue ? items.defaultValue : null,
              })(
                <Select style={{ width: 'auto' }}>
                  {items.opt.map((item, i) => <Option key={i} value={item.val}>{item.txt}</Option>)}
                </Select>
              )}
            </FormItem>
          }
        })}
        <FormItem>
          <Button type='primary' htmlType="submit" style={{ marginLeft: '20px' }} onClick={this.handleSubmit}>查找</Button>
        </FormItem>
      </Form>

    </div>
  }
}

const ActiveForm = Form.create()(ActiveFormForm);
export default ActiveForm;