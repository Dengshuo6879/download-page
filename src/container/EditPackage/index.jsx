import React from 'react';
import { Form, Button, Input, Select, message, Row, Col } from 'antd';
import $ from 'jquery';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;


class EditPackageForm extends React.Component {
  state = {
    filePath: '',
    file: {},
  }
  componentDidMount() {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      this.props.history.push('/codecraft/login');
    }
  }

  handleSubmit = () => {
    const { getFieldsValue, validateFields } = this.props.form;
    validateFields(
      (err) => {
        if (!err) {
          // 处理参数
          const params = { ...getFieldsValue() };
          const filePath = getFieldsValue()['filename'];
          this.setState({ filePath });
          // const fileNames = filePath.split('\\');
          var fileName = filePath.replace(/.*(\/|\\)/, '');
          // const fileName = fileNames[fileNames.length - 1];
          params.osType = parseInt(params.osType);
          params.isForceUpdate = parseInt(params.isForceUpdate);
          params.fileName = fileName;
          delete params.filename;

          const fileType = params.fileName.substring(params.fileName.length - 3);
          // osType 为 0，--> exe   osType 为 1， --> dmg
          if ((params.osType === 0 && fileType !== 'exe') || (params.osType === 1 && fileType !== 'dmg')) {
            message.error('上传安装包类型与选择安装包类型不符，请重新选择');
            return;
          }

          // 发起请求
          fetch('http://120.79.92.22/vmgr/craft/v/craftPackage', {
            method: 'PUT',
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
              if(data.code === 1000) {
                message.success('上传成功！')
                 setTimeout(() => {
                  this.props.history.push('/codecraft', {data: data.data, file: this.state.file})
                }, 1000)
              } else {
                message.error(`${data.message}, 请更改安装版本号`);
              }
             })
          });
        }
      },
    );
  }

  handleFileChange = () => {
    var file = document.getElementById('file').files[0];
    this.setState({file: file});
  }

  render() {
    const type = this.props.location.pathname.split('/')[2]; //获取路径
    const {query} = this.props.location;
    console.log(query)

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
              message: '安装包类型不能为空'
            }],
            initialValue: type === 'edit' ? (query.osTypeStr === 'windows' ? '0' : query.osTypeStr === 'mac'? '1': null) : null
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
              message: '安装包属性不能为空'
            }],
            initialValue: type === 'edit' ? (query.isForceUpdateStr === '非强制更新' ? '0' : query.isForceUpdateStr === '强制更新' ? '1' : null) : null
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
              message: '安装版本号不能为空'
            }],
            initialValue: type === 'edit' ? query.versionNo : null
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
              message: '安装包特性不能为空'
            }],
            initialValue: type === 'edit' ? query.description : null
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
              message: '请选择安装包'
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
              <input type='file' name='file' id='file' onChange={this.handleFileChange} />
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