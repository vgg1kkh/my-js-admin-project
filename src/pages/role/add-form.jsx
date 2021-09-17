import React from 'react'
import { Form, Input } from 'antd'

export default function AddForm(props) {

    return (
        <Form form={props.form}>
            <Form.Item label="Role Name" name="roleName"
                rules={[
                    {
                        required: true,
                        message: "Pls input the role name"
                    }
                ]}
            >
                <Input placeholder="Pls input the role name here" />
            </Form.Item>
        </Form>
    )
}
