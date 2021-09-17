import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    InputNumber,
    message,
} from 'antd';
import { reqAddOrUpdateUser } from '../../api';

const { Option } = Select;

export default function UserForm(props) {

    const { Option } = Select




    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const initialUser = () => {

    }

    const onFinished = async (values) => {
        // console.log('Received values of form: ', values);
        if (props.curUser._id) {
            values._id = props.curUser._id
        }
        const re = await reqAddOrUpdateUser(values)
        // console.log(re);
        if (re.status === 0) {
            message.success("Success!")
            props.getUsersAndRoles()
            props.setIsModalVisible(false)

        } else {
            message.error("Failed!")
        }

    };

    const onFinishFailed = reason => console.log("Registration failed.");

    useEffect(() => {
        if (props.curUser !== {}) initialUser()

    }, [props.curUser])

    return (
        <Form
            {...formItemLayout}
            name="register"
            preserve={false}
            onFinish={onFinished}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
            form={props.form}
        >
            <Form.Item
                label="Username"
                name="username"
                initialValue={props.curUser.username}
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                initialValue={props.curUser.email}
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            {props.curUser._id ? null : (
                <Form.Item
                    name="password"
                    label="Password"
                    initialValue={props.curUser.password}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
            )}

            {props.curUser._id ? null : (
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    initialValue={props.curUser.password}
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            )
            }

            <Form.Item
                name="phone"
                initialValue={props.curUser.phone}
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input a valid phone number!',
                    },
                ]}
            >
                <InputNumber
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item
                name="role_id"
                label="Role"
                initialValue={props.curUser.role_id}
                rules={[
                    { required: true, message: 'Pls select the role' },
                ]}

            >
                <Select >
                    {
                        props.roles.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)
                    }
                </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    {props.curUser._id ? "Update" : "Create"}
                </Button>
            </Form.Item>
        </Form>
    );
}
// username    |Y       |string   |用户名
// 	|password    |Y       |string   |密码
// 	|phone       |N       |string   |手机号
// 	|email       |N       |string   |邮箱
// 	|role_id 