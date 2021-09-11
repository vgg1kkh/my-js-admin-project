import React, { useEffect, useState } from 'react'
import { Card, Button, Table, message, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { reqAddCategory, reqCategory, reqUpdateCategory } from '../../api'
import UpdateForm from './update-form'
import AddForm from './add-form'




export default function Category(props) {

    const [categorys, setCategorys] = useState([])
    const [subCategorys, setSubCategorys] = useState([])
    const [parentId, setparentId] = useState("0")
    const [loading, setLoading] = useState(false)
    const [parentName, setParentName] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(0);
    const [updateForm] = Form.useForm()
    const [addForm] = Form.useForm()

    const [currentCategory, setCurrentCategory] = useState({})
    // const formREF = useRef()


    //method for modal starts here
    const showModalCategory = (category) => {
        /* 
        important:
        Update the cateogory name b4 set the modal visible
        the category name will not be display otherwise
        */
        setCurrentCategory(category)
        setIsModalVisible(1);

    };

    const showModalAdd = () => {
        setIsModalVisible(2);
    };

    const handleUpdateCatOk = () => {
        updateForm.validateFields()
            .then(async value => {
                const re = await reqUpdateCategory(currentCategory._id, value.category_name)
                if (re.status === 0) {
                    getCategory()
                } else {
                    message.error("Category modify failed.")
                }
                setIsModalVisible(0)//close the modal
            })
            .catch(reason => console.log("Pls input valid reason"))

    };

    const handleAddFormOk = async () => {
        // const re = await addForm.getFieldsValue()
        // console.log(re);
        //{select: '0', categoryName: 'fffff'}
        addForm.validateFields()
            .then(async values => {
                const re = await reqAddCategory(values.select, values.categoryName)
                console.log(re);
                if (re.status === 0) {
                    getCategory()
                } else {
                    message.error("Add new category failed.")
                }
                setIsModalVisible(0) //close the modal
            })
            .catch(reason => console.log(reason))


    }

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
                    <LinkButton onClick={() => showModalCategory(category)}>Modify</LinkButton>&nbsp;&nbsp;&nbsp;
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
        <Modal title="Modify" visible={isModalVisible === 1 ? true : false}
            onOk={handleUpdateCatOk} onCancel={handleCancel}
            destroyOnClose={true}
        >
            <UpdateForm
                form={updateForm} defaultName={currentCategory.name}
            />
        </Modal>
        <Modal title="Add" visible={isModalVisible === 2 ? true : false}
            onOk={handleAddFormOk} onCancel={handleCancel}
            destroyOnClose={true}
        >
            <AddForm
                form={addForm}
                categorys={categorys}
                subCategorys={subCategorys}
                parentId={parentId}
                parentName={parentName}
            />
        </Modal>
    </>
}
