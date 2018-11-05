import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class NoReceipt extends Component {

    state = {}

    
    render() {
        return (
                <div>
               Hi, I'm no receipt
                </div>
            )
        }
}


export default NoReceipt
