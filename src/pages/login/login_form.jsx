import * as React from 'react'
import { Form, Input, Button, message } from 'antd';
import { reqLogin } from '../../api';
import memory from '../../utils/memoryUtils';
import store from '../../utils/storageUtils'


const LoginForm = (props) => {

    const [loginForm] = Form.useForm()

    const onFinish = async (values) => {
        // values structure is {username: "adddf", password: "aadddf"}
        // Validate the form and then submit the request
        const re = await reqLogin(values.username, values.password)
        if(re.status===0){
            message.success("Login successful!")
            //save the user info into memory
            memory.user = re.data
            //save the user info into harddisk
            store.set(re.data)
            // redirect to the admin page with replace  
            props.replace('/')

        }else{
            message.error("Username or Password error")
        }  
                 
    }      

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //function to check the password
    const checkPwd = (_, value) => {
        if (!value) {
            return Promise.reject('Password is required');
        } else if (value.length < 4 || value.length > 12) {
            return Promise.reject('Password length is between 4 and 12');
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return Promise.reject('Password should be letter, number or underscore');
        } else {
            return Promise.resolve();
        }
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            form={loginForm}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, whitespace: true, message: 'Pls input the username' },
                    { max: 12, message: 'Maximum 12 letters' },
                    { min: 3, message: 'Minimum 3 letters' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username must be letter,number or underscore' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{
                    validator: checkPwd
                }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm