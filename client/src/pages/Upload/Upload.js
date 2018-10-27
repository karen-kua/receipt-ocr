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
    response: [],
    date: "",
    store: "hell",
    address: "",
    allPurchases: []
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
      this.getStoreAndItems(this.state.response)
    })
    .catch(err => console.log(err))
    this.setState({
      file: this.state.file.concat(file),
    });
    // req.end();
  }
  
  getStoreAndItems = data => {
    let purchaseArr = [];
    data.forEach(element => {
      if (element.includes("$")) {
        purchaseArr.push(element)
      }
    })
    console.log(purchaseArr)

    this.setState({
      store: data[0].replace(",", "")
    })
    console.log(`The store name is: ${this.state.store}`)
    this.handleItems(purchaseArr)
  }

  handleItems = data => {
    const purchaseArr = []
    data.forEach(element => {
      const item = element.slice(0, element.indexOf("$"))
      const cost = element.slice(element.indexOf("$"), 100)
      console.log(item, cost)
      const purchaseObj = {
        item: item,
        cost: cost
      }
      purchaseArr.push(purchaseObj)
    })
    this.setState({
      allPurchases: purchaseArr
    })
    console.log(this.state.allPurchases)
  }

  onPreviewDrop = (file) => {
    this.setState({
      file: this.state.file.concat(file),
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    console.log({ name, value })
    this.setState({
      [name]: value
    });
  };

  render() {

    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };

    return (


      <div className="app">

        <h1>Receipt Upload</h1>
        <ReactDropzone
          accept="image/*"
          // onDrop={this.onPreviewDrop}
          onDrop={this.onDrop}
        >
          Drag and drop your receipt here!
        </ReactDropzone>
        {this.state.file.length > 0 &&
          <Fragment>
            <h2>Previews</h2>
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
        <h2>Response demo</h2>
        <div>
          {this.state.response}
        </div>

      

        <div className="inputForm">
        <form onSubmit={this.onFormSubmit}>
          <input
            value={this.state.store}
            onChange={this.handleInputChange}
            placeholder="Store Name"
            name="store"
          />
          <br/>
          <input
            value={this.state.address}
            onChange={this.handleInputChange}
            placeholder="Address of Your Purchase"
            name="address"
          />
          <br/>
          <input
            value={this.state.date}
            onChange={this.handleInputChange}
            placeholder="Date of Your Purchase (YYYY/MM/DD)"
            name="date"
          />
          <br/>
          <input
            // value={this.state.date}
            // onChange={this.handleInputChange}
            placeholder="Purchase"
            name="purchase"
          />


          <span className="input-group">
            <button type="submit" className="btn btn-secondary">
              Submit
              </button>
          </span>
        </form>
</div>

        </div>
    );
  }
}

export default Upload;
