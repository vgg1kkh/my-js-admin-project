import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ProductHome from './home'
import Detail from './detail'
import ProductAddUpdate from './addUpdate'

export default function Product() {
    return <>
        <Switch>
            <Route exact path='/product' component={ProductHome} />
            <Route path='/product/addupate' component={ProductAddUpdate} />
            <Route path='/product/detail' component={Detail} />
            <Redirect to='/product' />
        </Switch>
    </>
}
