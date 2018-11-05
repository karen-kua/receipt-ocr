import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class LoginForm extends Component {
        state = {
            username: '',
            password: '',
            redirectTo: null
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
        {params: {
                username: this.state.username,
                password: this.state.password
            }})
            .then(res => {
                console.log('login response: Logged In ')
                console.log(res)

                localStorage.setItem('session_token', res.data.token);
                localStorage.setItem('user_welcome', res.data.message);
                localStorage.setItem('user_id', res.data.id);
                localStorage.setItem('username', res.data.username);
               
                this.props.history.push('/')
                
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
            })
    }

    

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <h4>Login</h4>
                    <form classNameX="form-horizontal">
                        <div classNameX="form-group">
                            <div classNameX="col-1 col-ml-auto">
                                <label classNameX="form-label" htmlFor="username">Username</label>
                            </div>
                            <div classNameX="col-3 col-mr-auto">
                                <input classNameX="form-input"
                                    name="username"
                                    placeholder="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div classNameX="form-group">
                            <div classNameX="col-1 col-ml-auto">
                                <label classNameX="form-label" htmlFor="password">Password: </label>
                            </div>
                            <div classNameX="col-3 col-mr-auto">
                                <input classNameX="form-input"
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div classNameX="form-group ">
                            <div classNameX="col-7"></div>
                            <button
                                classNameX="btn btn-primary col-1 col-mr-auto"
                               
                                onClick={this.handleSubmit}
                                type="submit">Login</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm
