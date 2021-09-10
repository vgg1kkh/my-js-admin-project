import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import memory from '../../utils/memoryUtils'
import { Layout } from 'antd'
import LeftNav from '../../components/Admin/left-nav'
import Header from '../../components/Admin/header'
import Home from '../home/home'
import Category from '../category/category'
import Role from '../role/role'
import Pie from '../charts/pie'
import Line from '../charts/line'
import Bar from '../charts/bar'
import Product from '../product/product'
import User from '../user/user'

const { Footer, Sider, Content } = Layout
//The admin page
const Admin = (props) => {

    if (!memory.user.username) {
        console.log(memory.user.username);
        console.log("redirect to login page");
        return <Redirect to="/login" />       
    }
    return <>
        <Layout style={{ minHeight: '100%' }}>
            <Sider style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <LeftNav />
            </Sider>
            <Layout>
                <Header />
                <Content style={{backgroundColor:'white'}}>
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/product" component={Product} />
                        <Route path="/role" component={Role} />
                        <Route path="/user" component={User} />
                        <Route path="/pie" component={Pie} />
                        <Route path="/line" component={Line} />
                        <Route path="/bar" component={Bar} />
                        <Route path="/category" component={Category} />
                        <Redirect to="/home" />
                    </Switch>


                </Content>
                <Footer style={{ textAlign: 'center' }}>Created by TOM HU</Footer>
            </Layout>
        </Layout>
    </>
}

export default Admin
