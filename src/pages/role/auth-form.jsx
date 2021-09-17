import React, { useEffect, useState } from 'react'
import { Form, Input, Tree } from 'antd'
import menuList from '../../config/menuConfig'

export default function AuthForm(props) {
    //treeData
    const [treeData, setTreeData] = useState([])
    //default checked keys
    const [checkedKeys, setCheckedKeys] = useState([])

    //Callback of the onCheck
    const onCheck = (keys) => {

        setCheckedKeys(keys)
        props.setMenu(keys)
    }

    const getTreeNode = datasource => {
        // return datasource.reduce((pre, curValue) => {
        //     if (curValue.children) {
        //         pre.push(
        //             {
        //                 title: curValue.title,
        //                 key: curValue.key,
        //                 children: getTreeNode(curValue.children)
        //             }
        //         )
        //     } else {
        //         pre.push(
        //             {
        //                 title: curValue.title,
        //                 key: curValue.key
        //             }
        //         )
        //     }
        //     return pre
        // }, [])
        const re = datasource.map(item => {
            if (item.children) {
                return (
                    {
                        title: item.title,
                        key: item.key,
                        children: getTreeNode(item.children)
                    }
                )

            } else {
                return (
                    {
                        title: item.title,
                        key: item.key
                    }
                )
            }
        })
        return re
    }


    const initTreeData = menuList => {

        const re = ([
            {
                title: "The platform",
                key: "all",
                children: getTreeNode(menuList)
            }
        ])
        setTreeData(re)

    }
    useEffect(() => {
        initTreeData(menuList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        //when the role changed, update the CheckedKeys
        setCheckedKeys(props.role.menus)

    }, [props.role])

    return (
        <Form preserve={false} >
            <Form.Item label="Role Name" >
                <Input disabled value={props.role.name}></Input>
            </Form.Item>
            <Form.Item name="tree">
                <Tree checkable defaultExpandAll
                    // checkedKeys={checkedKeys}
                    onCheck={onCheck}
                    treeData={treeData}
                    checkedKeys={checkedKeys}
                >
                </Tree>
            </Form.Item>
        </Form>
    )
}
