import * as React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import 'antd/dist/antd.less'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import store from './utils/storageUtils'
import memory from './utils/memoryUtils'





function App() {

  memory.user = store.get()
  // React.useEffect(() => {
  //   memory.user = store.get()
  //   return () => {
  //   // temperately disable below method to keep the App login in dev status
  //   // store.remove()
  //   }
  // }, [])

  //Put the user info into memory


  return <>
    <BrowserRouter>
      {/* Matching will be stopped when find the first one meet the creteria */}
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Admin} />
      </Switch>
    </BrowserRouter>


  </>
}

export default App;
