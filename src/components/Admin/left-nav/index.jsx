import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import logo from '../../../assets/imgs/birdy2.jpg'
import { Menu } from 'antd'
import * as Icon from '@ant-design/icons'
import menuList from '../../../config/menuConfig'

const { SubMenu } = Menu;

function LeftNav(props) {
    //Get the current path
    const { pathname } = props.location
    //Record the Open key for the path has the subMenu
    const [openKey, setOpenKey] = React.useState('')
    const [menuNodes, setMenuNodes] = React.useState([])

    const getIcon = icon_type => React.createElement(Icon[icon_type])

    const getMenuNodes = menu => menu.map(item => {
        if (!item.children) {
            return (
                <Menu.Item key={item.key} icon={getIcon(item.icon)}>
                    <Link to={item.key}>
                        {item.title}
                    </Link>
                </ Menu.Item>
            )
        } else {
            const { pathname } = props.location
            const cItem = item.children.find(cItem => cItem.key === pathname)
            if (cItem) setOpenKey(item.key) 
            // if (cItem) openKey = item.key
            // if (cItem) {setOpenKey (item.key)}
            return (
                <SubMenu key={item.key} title={item.title} icon={getIcon(item.icon)}>
                    {getMenuNodes(item.children)}
                </SubMenu>
            )
        }
    })
    // let openKey
    
    // const getMenuNodes = menu => menu.map(item => {
    //     if (!item.children) {
    //         return (
    //             <Menu.Item key={item.key} icon={getIcon(item.icon)}>
    //                 <Link to={item.key}>
    //                     {item.title}
    //                 </Link>
    //             </ Menu.Item>
    //         )
    //     } else {
    //         const cItem = item.children.find(cItem => cItem.key === pathname)
    //         if (cItem) setOpenKey(item.key) 
    //         // if (cItem) openKey = item.key
    //         // if (cItem) {setOpenKey (item.key)}
    //         return (
    //             <SubMenu key={item.key} title={item.title} icon={getIcon(item.icon)}>
    //                 {getMenuNodes(item.children)}
    //             </SubMenu>
    //         )
    //     }
    // })

    
    // const getMenuNodes_reduce = menu => menu.reduce((pre, item) => {
    //     if (!item.children) {
    //         pre.push((
    //             <Menu.Item key={item.key} icon={getIcon(item.icon)}>
    //                 <Link to={item.key}>
    //                     {item.title}
    //                 </Link>
    //             </ Menu.Item>))
    //     } else {
    //         pre.push((
    //             <SubMenu key={item.key} title={item.title} icon={getIcon(item.icon)}>
    //                 {getMenuNodes(item.children)}
    //             </SubMenu>))
    //     }
    //     return pre
    // }, [])
    React.useEffect(() => {

        const re = getMenuNodes(menuList)
        setMenuNodes(re)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <>
        <div className="left-nav-box">
            <Link to='/' className="left-nav-box-top">
                <div className="left-nav-box-top-img">
                    <img src={logo} alt="logo" />
                </div>
                <div className="left-nav-box-title">
                    Management system
                </div>
            </Link>
            <div className="left-nav-box-bottom">
                <div style={{ width: '100%' }}>
                    <Menu
                        defaultSelectedKeys={[pathname]}
                        defaultOpenKeys={[openKey]}
                        mode="inline"
                        theme="dark"
                    >
                        {menuNodes}
                    </Menu>
                </div>
            </div>
        </div>
    </>
}

export default withRouter(LeftNav)