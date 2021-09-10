import * as React from 'react'
import './login.less'
import logo from '../../assets/imgs/birdy2.jpg'
import LoginForm from './login_form'
import memory from '../../utils/memoryUtils'


//The login page
const Login = (props) => {
    
    //varify if user has logged in, redirect to the admin page if it exists
    console.log(memory.user.username);
    if(memory.user.username){
        props.history.replace('/')
        // props.history.replace('/')
    }
    const { replace } = props.history
    return (
        <div className="login-box">
            <header className="header">
                <div className="img-box">
                    <img src={logo} alt="logo"></img>
                </div>
                <span>System Login Page</span>
            </header>
            <section className="content">
                <div className="login-window">
                    <header className="login-window-header">LOGIN</header>
                    <section className="login-window-body">
                        <LoginForm replace={replace}/>
                    </section>

                </div>
            </section>
        </div>
    )
}

export default Login
