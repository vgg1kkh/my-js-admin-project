import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './index.less'
import formatDate from '../../../utils/dateUtils'
import { reqWeather } from '../../../api'
import menuList from '../../../config/menuConfig'
import memory from '../../../utils/memoryUtils'
import store from '../../../utils/storageUtils'
import LinkButton from '../../link-button'

const { confirm } = Modal

function Header(props) {

    const [time, setTime] = useState(formatDate(Date.now()))
    const [weather, setWeather] = useState('')
    const [title, setTitle] = useState('')
    const path = props.location.pathname


    // const getTitle = (menu) => {
    //     menu.forEach(item => {
    //         if (item.key === path) setTitle(item.title)
    //         else if (item.children) {
    //             getTitle(item.children) //recursive
    //         }
    //     })
    // }
    const getWeather = async () => {
        const re = await reqWeather()
        setWeather(re)
    }

    const handleOnClick = () => {
        confirm({
            title: 'Do you want to logout?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                memory.user = {}
                store.remove()
                props.history.replace('/login')

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //Get time and weather
    useEffect(() => {
        const int_id = setInterval(() => {
            setTime(formatDate(Date.now()))
        }, 1000)
        getWeather()
        return () => {
            clearInterval(int_id)
        }
    }, [])

    //get the title when the path changed.
    useEffect(() => {
        const getTitle = (menu) => {
            menu.forEach(item => {
                if (item.key === path) setTitle(item.title)
                else if (item.children) {
                    getTitle(item.children) //recursive
                }
            })
        }
        getTitle(menuList)
    }, [path])
    return (
        <div className="header-box">
            <div className="header-box-top">
                Welcome <span>{memory.user.username}</span>
                <LinkButton onClick={handleOnClick}>Logout</LinkButton>
            </div>
            <div className="header-box-bottom">
                <div className="header-box-bottom-left">{title}</div>
                <div className="header-box-bottom-right">
                    <span>{time}</span>
                    < img
                        src="https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg"
                        alt="weather" />
                    <span>{weather}degree</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)