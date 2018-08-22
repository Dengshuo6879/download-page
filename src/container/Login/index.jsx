import React from 'react';
import { Form, Input, Icon, message, Button, Row, Col } from 'antd';
import { commonUrl } from '../../common/common';
const FormItem = Form.Item;

class LoginForm extends React.Component {

  handleLogin = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          const params = this.props.form.getFieldsValue();
          let formData = new FormData();
          formData.append("userName", params.userName);
          formData.append("password", (params.password));
        
          // // 发起请求
          fetch(`${commonUrl}/user/authentication`, {
            method: 'POST',
            hostname: '120.79.92.22',
            body: formData,
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

    return (
      <div className='loginPage'>
        <div style={{ padding: '10px',borderBottom: '1px solid #ddd' }}>
          <Row>
            <Col span={2}>
              <img src={require('../InstallationHeader/logo.jpg')} alt='' />
            </Col>
          </Row>
        </div>


        <div style={{ width: '300px', margin: '100px  auto', textAlign: 'center' }}>
          <Form>
            <FormItem
            >
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入姓名' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem
            >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input prefix={<Icon type="lock" onChange={this.inputChange} style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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
      </div>
    )
  }
}

const Login = Form.create()(LoginForm);

export default Login;