import React, { useState, useEffect } from 'react'
import { Card, Button, Table, message, Modal, Form } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqAddRole, reqRoles, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memory from '../../utils/memoryUtils'
import formatDate from '../../utils/dateUtils'
import store from '../../utils/storageUtils'
export default function Role(props) {

    const [roles, setRoles] = useState([])
    //selected role
    const [role, setRole] = useState({})
    //visibility of AddForm Modal
    const [isAddRoleModalVisible, setIsAddRoleModalVisible] = useState(false)
    //visibility of AuthForm Modal
    const [isAuthModalVisible, setIsAuthModalVisible] = useState(false)
    //AddRole form label
    const [form1] = Form.useForm()
    //new menu
    const [menu, setMenu] = useState([])


    const openAddFormModal = () => setIsAddRoleModalVisible(true)
    const openAuthFormModal = () => setIsAuthModalVisible(true)

    const title = (
        <span>
            <Button type="primary" onClick={openAddFormModal}>Create User</Button>&nbsp;&nbsp;
            <Button type="primary" disabled={!role._id}
                onClick={openAuthFormModal}>
                Setup Permission</Button>
        </span>
    )

    const columns = [
        {
            title: 'Role',
            dataIndex: 'name'
        },
        {
            title: 'create time',
            dataIndex: 'create_time',
            render: create_time => formatDate(create_time)
        },
        {
            title: 'auth time',
            dataIndex: 'auth_time',
            render: auth_time => formatDate(auth_time)
        },
        {
            title: 'auth person',
            dataIndex: 'auth_name',
        }
    ]
    const onRow = role => {
        return {
            onClick: (e) => {
                setRole(role)
            }
        }
    }

    const getRoles = async () => {
        const re = await reqRoles()
        if (re.status === 0) {
            setRoles(re.data)
            setIsAddRoleModalVisible(false)
        } else {
            message.error("Failed to get the role list.")
        }
    }

    const handleAddFormOk = () => {

        //   console.log(form1.getFieldsValue()) 
        form1.validateFields()
            .then(async values => {
                // console.log(values)
                const re = await reqAddRole(values.roleName)
                if (re.status === 0) {
                    getRoles()
                } else {
                    message.error("Failed to add new role.")
                }
            })
            .catch(reason => {
                console.log(reason)
            })
    }

    const handleAddRoleCancel = () => setIsAddRoleModalVisible(false)

    const handleAuthFormOk = async () => {

        if (menu !== []) {
            role.menus = menu
            role.auth_name = memory.user.username
            const re = await reqUpdateRole(role)
            if (re.status === 0) {
                message.success("The role updated")
                // console.log("role=",role,memory.user);
                if(role._id === memory.user.role._id){
                    //if the user is changing the right of itself,force logout immediately 
                    memory.user = {}
                    store.remove()
                    props.history.replace('/login')
                }
                getRoles()
            } else {
                message.error("Update failed.")
            }
            setMenu([]) //reset the menu in memory
        }
        setIsAuthModalVisible(false)

    }

    const handleAuthFormCancel = () => setIsAuthModalVisible(false)

    useEffect(() => {
        getRoles()
    }, [])

    return <>
        <Card title={title}  >
            <Table
                dataSource={roles}
                columns={columns}
                bordered
                rowKey='_id'
                pagination={
                    {
                        defaultPageSize: PAGE_SIZE
                    }
                }
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: [role._id],
                    onSelect: role => setRole(role) //To fix the bug of can't click the radio
                }}
                onRow={onRow}
            />
            <Modal title="AddForm Modal" visible={isAddRoleModalVisible}
                onOk={handleAddFormOk} onCancel={handleAddRoleCancel}
                destroyOnClose>
                <AddForm form={form1} />
            </Modal>
            <Modal title="Permission Setup Modal" visible={isAuthModalVisible}
                onOk={handleAuthFormOk} onCancel={handleAuthFormCancel}>
                <AuthForm role={role}
                    setMenu={setMenu}
                    destroyOnClose={true} />
            </Modal>
        </Card>


    </>
}
