import React from 'react';
import { Form, Input, Icon, message, Button } from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {

  handleLogin = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
          const params = this.props.form.getFieldsValue();
          // let formData = new FormData();
          // formData.append("userName", params.userName);
          // formData.append("password", params.password);
          // // 发起请求
          fetch('http://120.79.92.22:7888/vmgr/user/authentication', {
            method: 'POST',
            hostname: '120.79.92.22',
            body: JSON.stringify(params),
            headers: {
              "Access-Control-Allow-Origin": "*",
            }
          }).then(res => {
            res.json().then(data => {
              // console.log(data);
              if (data.code === 1000) {
                message.success('登录成功');
                localStorage.setItem('userName', params.userName);
                setTimeout(() => {
                  this.props.history.push('/codecraft')
                }, 1000)
              } else {
                message.error('登录失败');
              }
            })
          });
        }
      },
    );

  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (<div style={{ width: '300px', margin: '100px  auto', textAlign: 'center' }}>
      <Form>
        <FormItem
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.handleLogin}
          >
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
    )
  }
}

const Login = Form.create()(LoginForm);

export default Login;