import React, { useState, useEffect } from 'react'
import { Card, Button, Table, message, Modal, Form } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { reqDelUser, reqUsers } from '../../api';
import formatDate from '../../utils/dateUtils';
import LinkButton from '../../components/link-button';
import UserForm from './user-form';

const { confirm } = Modal

export default function User() {

    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [ usersRole, setUsersRole ] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [curUser, setCurUser] = useState({})
    const [form] = Form.useForm()

    const modifyUser = curUser => {
        setCurUser(curUser)
        setIsModalVisible(true)
    }

    function showConfirm(curUser) {
        confirm({
          title: 'Do you Want to delete the user?',
          icon: <ExclamationCircleOutlined />,
          async onOk() {
            // console.log(curUser);
            const re = await reqDelUser(curUser._id)
            // console.log(re);
            if(re.status === 0){
                message.success("Delete Success!")
                getUsersAndRoles()
            }else{
                message.error("Delete failed.")
            }
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    const deleteUser = curUser => {
        showConfirm(curUser)

    }
    const columns = [
        {
            title: 'USERNAME',
            dataIndex: 'username'
        },
        {
            title: 'EMAIL',
            dataIndex: 'email'
        },
        {
            title: 'PHONE NUMBER',
            dataIndex: 'phone'
        },
        {
            title: 'CREATE_TIME',
            dataIndex: 'create_time',
            render: create_time => formatDate(create_time)

        },
        {
            title: 'ROLE',
            dataIndex: 'role_id',
            render: role_id => usersRole[role_id] 

        },
        {
            title: 'OPERATION',
            render: (user) => (<>
                <LinkButton onClick={()=> modifyUser(user)}>Modify</LinkButton>
                <LinkButton onClick={()=> deleteUser(user)}>Delete</LinkButton>
            </>)
        }
    ]

    

    const getUsersAndRoles = async () => {
        const re = await reqUsers()
        if (re.status === 0) {
            console.log(re.data);
            setUsers(re.data.users)
            setRoles(re.data.roles)
        } else {
            message.error("Failed to get the user list")
        }
    }

    const createRoleIdAndRoleNameList = () => {
        const roleList = roles
        const re = roleList.reduce((pre,item) =>{
            pre[item._id] = item.name
            return pre
        },{})
        setUsersRole(re)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }


    const title = <Button type="primary" onClick={()=>setIsModalVisible(true)}>
        Create User</Button>

    useEffect(() => {
        getUsersAndRoles()
    }, [])

    //Set the reflection for role_id and roleName
    useEffect(() => {
        createRoleIdAndRoleNameList()
    },[roles])

    return <>
        <Card title={title}  >
            <Table dataSource={users} columns={columns}
                rowKey="_id"
            />
            <Modal title="Basic Modal" visible={isModalVisible} 
            onOk={handleOk} onCancel={handleCancel}
            destroyOnClose={true} footer={false}
            afterClose={()=>setCurUser({})} //Clear the fields when the modal closed.
            >
                <UserForm roles={roles} 
                setIsModalVisible={setIsModalVisible}
                getUsersAndRoles={getUsersAndRoles}
                curUser={curUser}
                form={form}
                />
            </Modal>
        </Card>



    </>
}
