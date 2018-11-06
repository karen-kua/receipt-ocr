import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import './LogIn.css'

class LoginForm extends Component {
    state = {
        username: "",
        password: "",
        loginMsg: "",
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log('handleSubmit')
        console.log(this.state.username)
        console.log(this.state.password)
        axios.get('/login',
            {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
            .then(res => {
                if (res.data.validate === false) {
                    console.log("Login failed")
                    this.setState({ 
                        loginMsg: "Login failed. The username/password did not match.",
                        username: "",
                        password: ""
                 })
                } else {
                    console.log('login response: Logged In ')
                    console.log(res)

                    localStorage.setItem('session_token', res.data.token);
                    localStorage.setItem('user_welcome', res.data.message);
                    localStorage.setItem('user_id', res.data.id);
                    localStorage.setItem('username', res.data.username);
                    this.props.history.push('/')
                }
            })
            .catch(error => {
                console.log('login error: ')
                console.log(error);
            })

    }



    render() {
        // if (this.state.redirectTo) {
        //     return <Redirect to={{ pathname: this.state.redirectTo }} />
        // } else {
        return (
            <div className="login-body">

                <h4>Login</h4>
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="username"></label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-3 col-ml-auto">
                            <label className="form-label" htmlFor="password"></label>
                        </div>
          
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                placeholder="password"

                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="col-7">
                            <button
                                className="btn btn-primary col-1 col-mr-auto"
                                onClick={this.handleSubmit}
                                type="submit">
                                Login
                                </button>
                        </div>
                        <div className="register-div">
                            Don't have an account? Sign up for one <a href="/sign-up">here</a>
                        </div>

                        <div>
                            {this.state.loginMsg}
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}


export default LoginForm
