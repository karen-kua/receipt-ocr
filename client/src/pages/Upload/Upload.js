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
    store: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
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
      store: data[0].replace(",", ""),
      allPurchases: purchaseArr

    })
    console.log(`The store name is: ${this.state.store}`)
    console.log(this.state.allPurchases)
    // this.handleItems(purchaseArr)
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

handleItemChange = (index, event) => {
console.log("The index: " + index)
  let copyOfPurchases = [...this.state.allPurchases]
  copyOfPurchases[index] = event.target.value
  console.log(copyOfPurchases[index])
    this.setState({
      allPurchases: copyOfPurchases
    });
  console.log(this.state.allPurchases)
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
        {/* <h2>Response demo</h2> */}
        {/* <div>
          {this.state.response}
        </div> */}

        <div className="inputForm">
        <form onSubmit={this.onFormSubmit}>
        <h3>Store:</h3>
          <input
            value={this.state.store}
            onChange={this.handleInputChange}
            // placeholder="Store Name"
            name="store"
          />
          <br/>
          <h3>Street Address:</h3>
          <input
            value={this.state.street}
            onChange={this.handleInputChange}
            // placeholder="Street Address of Your Purchase"
            name="street"
          />
          <br/>
          <h3>City:</h3>
          <input
            value={this.state.city}
            onChange={this.handleInputChange}
            // placeholder="City of Your Purchase"
            name="city"
          />
          <br/>
          <h3>Province:</h3>
          <input
            value={this.state.province}
            onChange={this.handleInputChange}
            // placeholder="Province of Your Purchase"
            name="province"
          />
          <br/>
          <h3>Postal Code:</h3>
          <input
            value={this.state.postalCode}
            onChange={this.handleInputChange}
            // placeholder="Postal Code  of Your Purchase"
            name="postalCode"
          />
          <br/>
          <h3>Date of the Purchase:</h3>
          <input
            value={this.state.date}
            onChange={this.handleInputChange}
            // placeholder="Date of Your Purchase (YYYY/MM/DD)"
            name="date"
          />
          <br/>
          <h3>Items:</h3>
            {this.state.allPurchases.map((purchase, index) => (
              <div key={index}>
                <input
              value={purchase}
              onChange={(event) => this.handleItemChange(index, event)}
              name="allPurchases"
              />
             </div>
            ))}

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
