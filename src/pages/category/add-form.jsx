import React from 'react'
import { Form, Select, Input } from 'antd'

const { Item } = Form
const { Option } = Select

export default function AddForm() {

    const onFinish = (values) => {
        console.log(values);
      };
    
    return (
        <Form onFinish={onFinish}>
            <Item>
                <Select name="update">
                    <Option value="0">Category A</Option>
                    <Option value="1">Computer</Option>
                    <Option value="2">Phones</Option>
                </Select>
            </Item>

            <Item>
                <Input placeholder="Pls input the category name" />
            </Item>
        </Form>
    )
}
