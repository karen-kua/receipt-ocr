import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class UploadSuccess extends Component {

    state = {}

    goToReceiptUpload = event => {
        event.preventDefault();
        this.props.history.push('/upload')
    }

    goToUserInput = event => {
        event.preventDefault();
        this.props.history.push('/upload-user-input')
    }

    goToBrowse = event => {
        event.preventDefault();
        this.props.history.push('/browse')
    }
    
    render() {
        return (
                <div>
                {/* <div className="jumbotron"> */}
                    <h1>Your expenses have been saved!</h1>
                    <p>What would you like to do now?</p>
                    <span>
                        <button className="btn btn-info" onClick={this.goToReceiptUpload}>Upload another expense (I have a receipt)</button>
                        <button className="btn btn-primary" onClick={this.goToUserInput}>Upload another expense (I do not have a receipt)</button>
                        <button className="btn btn-warning" onClick={this.goToBrowse}>Browse my expenses</button>
                    </span>
                {/* </div> */}
                </div>
            )
        }
}


export default UploadSuccess
