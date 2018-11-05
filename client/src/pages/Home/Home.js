import React, { Component } from 'react'
import './Home.css'

class Home extends Component {

    state = {
        welcomeMsg: "",
    }

    componentDidMount = () => {
        const welcomeMsg = localStorage.getItem('user_welcome');
        this.setState({welcomeMsg: welcomeMsg},
        () => console.log(`The welcome msg is: ${welcomeMsg}`))
    }
    
    render() {
        return (
                <div style = {{height:"100vh"}} className="body">
               <div>
               <div className="header1">Track Your Expenses Online</div>
               <div className="header2">No paper. No fuss.</div>
               <div id="welcomeMsg">{this.state.welcomeMsg}</div>
               </div>
                </div>
            )
        }
}


export default Home
