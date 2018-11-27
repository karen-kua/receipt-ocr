import React, { Component } from 'react';
import API from "../../utils/API";
import { withRouter } from 'react-router-dom';
import './LogIn.css';

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
        event.preventDefault();
        API.logIn(
        {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then(res => {
                if (res.data.validate === false) {
                    this.setState({
                        loginMsg: "Login failed. The username/password did not match.",
                        username: "",
                        password: ""
                    })
                } else {
                    localStorage.setItem('session_token', res.data.token);
                    localStorage.setItem('user_welcome', res.data.message);
                    localStorage.setItem('user_id', res.data.id);
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('isAuthenticated', true);
                    this.props.history.push('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
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
                                placeholder="Password"

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
                                className="btn btn-primary"
                                onClick={this.handleSubmit}
                                type="submit">
                                Submit
                                </button>
                        </div>
                        <div className="register-div">
                            Don't have an account? Sign up for one <a href="/sign-up">here</a>
                        </div>

                        <div style={{ color: 'white', marginTop: '10px', position: 'relative', right: '37%' }}>
                            {this.state.loginMsg}
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}


export default LoginForm
