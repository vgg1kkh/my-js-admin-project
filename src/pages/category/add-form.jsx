import React from 'react'
import { Form, Select, Input } from 'antd'

const { Item } = Form
const { Option } = Select

export default function AddForm(props) {

    const { categorys, parentId, parentName } = props

    const getOptionNodes = () => {
        if (parentId === "0") {
            // Sample structure: <Option value="0">Primary Category</Option>
            return categorys.map(item => {
                return (
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                )
            })
        } else {
            return <Option key={parentId} value={parentId}>{parentName}</Option>
        }
    }

    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <Form onFinish={onFinish}
            form={props.form}
            preserve={false} // important to reset the closed field
        >
            <Item initialValue={parentId}
                name="select"
                rules={[
                    {
                        required: true,
                        message: 'Please select the parent category name',
                    },
                ]}
            >
                <Select name="parentId" >
                    <Option value="0">Primary Category</Option>
                    {getOptionNodes()}
                </Select>
            </Item>

            <Item name="categoryName"
                rules={[
                    {
                        required: true,
                        message: 'Please input the new category name',
                    },
                ]}
            >
                <Input placeholder="Pls input the category name" />
            </Item>
        </Form>
    )
}
