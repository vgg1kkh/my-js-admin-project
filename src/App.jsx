import * as React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import 'antd/dist/antd.less'
import Login from './pages/login/login';
import Admin from './pages/admin/admin'
import {Button} from 'antd'


function App() {
  return <>
    <BrowserRouter>
      {/* Matching will be stopped when find the first one meet the creteria */}
      <Switch>
        <Route path='/' component={Admin} exact/>
        <Route path='/login' component={Login} />
      </Switch>
    </BrowserRouter>


  </>
}

export default App;
