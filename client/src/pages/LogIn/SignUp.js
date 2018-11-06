import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import './LogIn'

class Signup extends Component {
	
	state = {
			username: "",
			password: "",
			statusMsg: ""
			// confirmPassword: '',

		}
	
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit = (event) => {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/signup', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (response.data.validate === false) {
					console.log("The username is already taken")
					this.setState({
						statusMsg: "The registration failed. That username has already been taken!",
						username: "",
						password: ""
					})
				} else {
					console.log("Successful sign-up!")
					this.props.history.push("/login")
				}
				
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	return (
		<div className="login-body">
			<h4>Sign up</h4>
			<form classNameX="form-horizontal">
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="username"></label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							type="text"
							id="username"
							name="username"
							placeholder="Enter a Username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="password"></label>
					</div>

					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="Enter a Password"
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
						type="submit"
					>Sign up</button>
					</div>
				<div  style={{color:'white',marginTop:'10px',position:'relative',right:'37%'}}>
					{this.state.statusMsg}
					</div>
				</div>

			</form>
		</div>

	)
}
}

export default Signup
