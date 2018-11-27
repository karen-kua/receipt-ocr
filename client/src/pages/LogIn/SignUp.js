import React, { Component } from 'react';
import API from "../../utils/API";
import { withRouter } from 'react-router-dom';
import './LogIn.css';

class Signup extends Component {

	state = {
		username: "",
		password: "",
		statusMsg: ""
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit = event => {
		event.preventDefault()
		API.signup({
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				if (response.data.validate === false) {
					this.setState({
						statusMsg: "The registration failed. That username has already been taken!",
						username: "",
						password: ""
					})
				} else {
					this.props.history.push("/login")
				}
			}).catch(error => {
				console.log(error)
			})
	}

	render() {
		return (
			<div className="login-body">
				<h4>Sign up</h4>
				<form classNameX="form-horizontal" onSubmit={this.handleSubmit}>
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
								required
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
								pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" 
								title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters" 
								required
							/>
						</div>
					</div>
					<div className="form-group ">
						<div className="col-7">
							<button
								className="btn btn-primary"
								type="submit"
							>Sign up</button>
						</div>
						<div style={{ color: 'white', marginTop: '10px', position: 'relative', right: '37%' }}>
							{this.state.statusMsg}
						</div>
					</div>

				</form>
			</div>

		)
	}
}

export default Signup;
