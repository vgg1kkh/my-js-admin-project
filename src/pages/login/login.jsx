import * as React from 'react'
import './login.less'
import logo from './imgs/birdy2.jpg'
import LoginForm from './login_form'


//The login page
const Login = (props) => {
    const {push} = props.history
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
                        <LoginForm />
                    </section>

                </div>
            </section>
        </div>
    )
}

export default Login
