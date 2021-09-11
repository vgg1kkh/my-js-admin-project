import React from 'react'
import { Form, Input } from 'antd'

const { Item } = Form

export default function UpdateForm(props) {

    const { defaultName } = props

    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <Form onFinish={onFinish}
            //important: setup the form and transfer to father component
            form={props.form}
            preserve={false} // important to reset the closed field
        >
            <Item name="category_name"
                initialValue={defaultName}
                rules={[
                    {
                        required: true,
                        message: 'Please input the category name',
                    },
                    // {
                    //     pattern: \^[\u4e00-\u9fa5_a-zA-Z0-9]+$\,
                    //     message: "Pls input letter,number or underscore "
                    // }
                ]}
            >
                <Input />
            </Item>
        </Form>
    )
}
