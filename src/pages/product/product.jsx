import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ProductAddUpdate from './add_update'
import ProductHome from './home'
import Detail from './detail'

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
