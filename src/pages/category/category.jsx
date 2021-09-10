import React, { useEffect, useState } from 'react'
import { Card, Button, Table, message, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { reqCategory } from '../../api'
import UpdateForm from './update-form'
import AddForm from './add-form'




export default function Category(props) {

    const [categorys, setCategorys] = useState([])
    const [loading, setLoading] = useState(false)
    const [parentId, setparentId] = useState("0")
    const [parentName, setParentName] = useState("")
    const [subCategorys, setSubCategorys] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(0);
    const [updateForm] = Form.useForm()
    // const formREF = useRef()


    //method for modal starts here
    const showModalCategory = () => {
        setIsModalVisible(1);
    };

    const showModalAdd = () => {
        setIsModalVisible(2);
    };

    const handleOk = async () => {
        console.log(await updateForm.getFieldsValue())
        setIsModalVisible(0);
    };

    const handleCancel = () => {
        setIsModalVisible(0);
    };
    // method for modal ends here  
    const extra = (
        <Button type="primary" onClick={showModalAdd}><PlusOutlined />Add</Button>
    )

    const columns = [
        {
            title: 'Category',
            dataIndex: 'name',
            // key: '_id'       
        },
        {
            title: 'Operation',
            // key:'_id',
            width: 200,
            render: (category) => {
                return <>
                    <LinkButton onClick={showModalCategory}>Modify</LinkButton>&nbsp;&nbsp;&nbsp;
                    {parentId === "0" ?
                        (<LinkButton onClick={() => showSubCategorys(category)}>
                            Sub category</LinkButton>) : null}

                </>
            }
        },
    ]

    const getCategory = async () => {
        setLoading(true)
        const re = await reqCategory(parentId)
        setLoading(false)
        if (re.status === 0) {
            if (parentId === "0") {
                setCategorys(re.data)
            } else {
                setSubCategorys(re.data)
            }
        } else {
            message.error("Can't retrive the data!")
        }
    }

    /* update the parent Id , name and
    get the category list */
    const showSubCategorys = category => {
        setparentId(category._id)
        setParentName(category.name)
    }

    const showPriCategorys = () => {
        setparentId("0")
        setParentName('')
        setSubCategorys([])
    }

    //Card title
    const title = (
        parentId === "0" ? "Primary Category" :
            (<span>
                <LinkButton onClick={showPriCategorys}>Home</LinkButton> -{'>'}{parentName}
            </span>
            )
    )

    /* 
    getCateogory() will run after the component is mounted,
    and if the parentId changed, it will run again.
    */
    useEffect(() => {
        getCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentId])


    return <>
        <Card title={title} extra={extra} >
            <Table columns={columns}
                dataSource={parentId === '0' ? categorys : subCategorys}
                bordered
                rowKey="_id"
                pagination={{
                    defaultPageSize: 5,
                    showQuickJumper: true
                }}
                loading={loading}
            />
        </Card>
        <Modal title="Modify" visible={isModalVisible === 1 ? true : false} onOk={handleOk} onCancel={handleCancel}>
            <UpdateForm form={updateForm}/>
        </Modal>
        <Modal title="Add" visible={isModalVisible === 2 ? true : false} onOk={handleOk} onCancel={handleCancel}>
                <AddForm />
        </Modal>
    </>




}
