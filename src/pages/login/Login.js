import React from 'react';
import {Form, Input, Button, message} from 'antd';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import __storage from "../../utils/storage";
import {__cloneDeep} from "../../utils/lodash";
import './index.css';
import {log} from "../../utils/util";


const Login = () => {

  const navigate = useNavigate();

  const saveUserInfoAndRole = (data) => {
    __storage.clear()
    let roleInfo = __cloneDeep(data)
    delete roleInfo.password
    __storage.set('roleInfo', roleInfo)
  }

  const onFinish = (values) => {
    axios.get("http://localhost:3000/users").then((res) => {
      const {data = []} = res || {};
      let isLogin = false
      if (data.length > 0) {
        data.forEach((item) => {
          if (item.username === values.username && item.password === values.password) {
            log("登录成功 item", item);
            isLogin = true
            saveUserInfoAndRole(item)
          }
        });
        if (isLogin) {
          message.success('登录成功')
          // 跳转到首页
          navigate('/home')
        } else {
          message.error('账号或密码错误，登录失败')
        }
      }
    });
  };

  return (
    <div>
      <h1 className='login_center'>Login Page</h1>
      <div className='login_center'>
        <Form onFinish={onFinish}>
          <Form.Item
            label="账号"
            name="username"
            rules={[{required: true, message: '请输入账号'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{required: true, message: '请输入密码'}]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item className='login_center'>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;