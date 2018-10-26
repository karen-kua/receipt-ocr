import React, { Component, Fragment } from "react";
// import { render } from "react-dom";
// import API from "../../utils/API";
import ReactDropzone from "react-dropzone";
import axios from "axios"
// import DeleteBtn from "../../components/DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

class Upload extends Component {
  state = {
    file: [],
    response = []
  };

  componentDidMount() {
    this.checkMount();
  }

  checkMount = () => {
    console.log("Upload Component has mounted!")
  };

  onDrop = (file) => {
    // POST to a test endpoint for demo purposes
    let photo = new FormData();
    photo.append('photo', file[0]);
    axios.post('/api/expense/upload', photo)
      .then(res => {
        console.log(res);
        this.setState({
          response: res.data
        })
      })
      .catch(err => console.log(err))
    this.setState({
      file: this.state.file.concat(file),
    });
    // req.end();
  }

  onPreviewDrop = (file) => {
    this.setState({
      file: this.state.file.concat(file),
    });
  }

  render() {

    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };

    return (

    
      <div className="app">
        <h1>react-dropzone Demo</h1>

        <h2>Basic Example</h2>
        <ReactDropzone
          onDrop={this.onDrop}
        >
          Drop your best gator GIFs here!!
        </ReactDropzone>

        <h2>Image Previews</h2>
        <ReactDropzone
          accept="image/*"
          // onDrop={this.onPreviewDrop}
          onDrop={this.onDrop}
        >
          Drop an image, get a preview!
        </ReactDropzone>
        {this.state.file.length > 0 &&
          <Fragment>
            <h3>Previews</h3>
            {this.state.file.map((file) => (
              <img
                alt="Preview"
                key={file.preview}
                src={file.preview}
                style={previewStyle}
              />
            ))}
          </Fragment>
        }

      </div>
    );
  }
}

export default Upload;
