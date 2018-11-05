import React, { Component } from 'react'
import './Home.css'

class Home extends Component {

    state = {}


    
    render() {
        return (
                <div style = {{height:"100vh"}} className="body">
               <div>
               <div className="header2">Hi {localStorage.getItem("username")}!!!</div>
               <div className="header1">Track Your Expenses Online</div>
               <div className="header2">No paper. No fuss.</div>
               </div>
                </div>
            )
        }
}


export default Home
