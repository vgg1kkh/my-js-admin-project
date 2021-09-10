import React from 'react'
import { Form, Select, Input } from 'antd'

const { Item } = Form

export default function UpdateForm(props) {

    const onFinish = (values) => {
        console.log("updateform");
        console.log(values);
      };
    
    return (
        <Form onFinish={onFinish}
         form={props.form}
        >
            <Item name="category name">
                <Input placeholder="Pls input the category name" />
            </Item>
        </Form>
    )
}
