import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal';
import './Upload.css'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


class UploadSuccess extends Component {

    state = {
        modalIsOpen: false
    }

    componentDidMount = event => {
        this.openModal()
    }

    openModal = event => {
        this.setState({modalIsOpen: true});
      }
    
      afterOpenModal = event => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#db6f68';
      }
    
    //   closeModal = event => {
    //     this.setState({modalIsOpen: false});
    //   }

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
                <div className="upload-success-container">
        
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Upload-Success-Modal"
        >
      
            <div className="success-modal-content">
          <h2 ref={subtitle => this.subtitle = subtitle}>Your expenses have been saved!</h2>
          {/* <button onClick={this.closeModal}>close</button> */}
          <div>What would you like to do now?</div>
          <button className="btn btn-info" onClick={this.goToReceiptUpload}>Upload another expense (I have a receipt)</button>
                        <button className="btn btn-primary" onClick={this.goToUserInput}>Upload another expense (I do not have a receipt)</button>
                        <button className="btn btn-warning" onClick={this.goToBrowse}>Browse my expenses</button>
       </div>
        </Modal>



    




                </div>
            )
        }
}


export default UploadSuccess
