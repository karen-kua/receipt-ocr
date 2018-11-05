import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
	
	state = {
			username: '',
			password: '',
			confirmPassword: '',

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
		axios.post('/sign-up', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				// if (!response.data.errmsg) {
				// 	console.log('successful signup')
				// 	this.setState({ //redirect to login page
				// 		redirectTo: '/login'
				// 	})
				// } else {
				// 	console.log('username already taken')
				// }
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	return (
		<div classNameX="SignupForm">
			<h4>Sign up</h4>
			<form classNameX="form-horizontal">
				<div classNameX="form-group">
					<div classNameX="col-1 col-ml-auto">
						<label classNameX="form-label" htmlFor="username">Username</label>
					</div>
					<div classNameX="col-3 col-mr-auto">
						<input classNameX="form-input"
							type="text"
							id="username"
							name="username"
							placeholder="Username"
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
						type="submit"
					>Sign up</button>
				</div>
			</form>
		</div>

	)
}
}

export default Signup
