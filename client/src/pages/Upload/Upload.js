import React, { Component, Fragment } from "react";
import API from "../../utils/API";
import ReactDropzone from "react-dropzone";
// import axios from "axios"
// import DeleteBtn from "../../components/DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

class Upload extends Component {
  state = {
    showInput: false,
    file: [],
    response: [],
    date: "",
    store: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    allItems: [],
    allCosts: [],
    allCategories: [],
    submitStatus: ""
  };

  componentDidMount() {
    this.checkMount();
  }

  checkMount = () => {
    console.log("Upload Component has mounted!")
  };


  onDrop = (file) => {
    let photo = new FormData();
    photo.append('photo', file[0]);
    API.uploadReceipt(photo)
    // axios.post('/api/expense/upload', photo)
      .then(res => {
        console.log(res);
        this.setState({
          response: res.data,
          showInput: true
        })
        this.getStoreAndItems(this.state.response)
      })
      .catch(err => console.log(err))
    this.setState({
      file: this.state.file.concat(file)
    });
  }

  getStoreAndItems = data => {
    let purchaseArr = [];
    let itemsArr = [];
    let costArr = []
    data.forEach(element => {
      if (element.includes("$")) {
        element = element.replace(",", "")
        purchaseArr.push(element)
      }
    })
   purchaseArr.forEach(element => {
    let item = element.slice(0, element.indexOf("$"))
    let cost = element.slice(element.indexOf("$"), 100)
    itemsArr.push(item)
    costArr.push(cost)
   })
    this.setState({
      store: data[0].replace(",", ""),
      allItems: itemsArr,
      allCosts: costArr
    })
    console.log(`The store name is: ${this.state.store}`)
    console.log(this.state.allItems)
    console.log(this.state.allCosts)
    this.makeAllCategoriesState(this.state.allItems)
  }

  // onPreviewDrop = (file) => {
  //   this.setState({
  //     file: this.state.file.concat(file),
  //   });
  // }

  handleInputChange = event => {
    const { name, value } = event.target;
    console.log({ name, value })
    this.setState({
      [name]: value
    });
  };

  handleItemChange = (index, event) => {
    console.log("The index: " + index)
    let copyOfItems = [...this.state.allItems]
    copyOfItems[index] = event.target.value
    console.log(copyOfItems[index])
    this.setState({
      allItems: copyOfItems
    }, () => console.log(this.state.allItems));
  };

  handleCostChange = (index, event) => {
    console.log("The index: " + index)
    let copyOfCosts = [...this.state.allCosts]
    copyOfCosts[index] = event.target.value
    console.log(copyOfCosts[index])
    this.setState({
      allCosts: copyOfCosts
    }, () => console.log(this.state.allCosts));
  };

  handleDropDown = (event) => {
    this.setState({
      category: event.target.value
    }, () => console.log(this.state.category)
  );
    console.log("This is the event value: " + event.target.value)
  }

  deleteItem = (index, event) => {
    event.preventDefault();
    let copyOfItems = [...this.state.allItems]
    let copyOfCategories = [...this.state.allCategories]
    let copyOfCosts = [...this.state.allCosts]
    copyOfCategories.splice(index,1)
    copyOfItems.splice(index,1)
    copyOfCosts.splice(index,1)
    this.setState({
      allItems: copyOfItems,
      allCategories: copyOfCategories,
      allCosts: copyOfCosts
    }, () => {
      console.log(this.state.allItems)
      console.log(this.state.allCategories)
      console.log(this.state.allCosts)
    })
  }

  handleCategories = (index, event) => {
    console.log("The category index is: " + index)
    console.log("This is the event value: " + event.target.value)
    let copyOfCategories = [...this.state.allCategories]
    copyOfCategories[index] = event.target.value
    this.setState({
      allCategories: copyOfCategories
    }, () => console.log(this.state.allCategories))
  }

  makeAllCategoriesState = data => {
    const copyOfCategories = [];
    for (let i =0; i<data.length; i++) {
      const element = "Category"
      copyOfCategories.push(element)
    }
    this.setState({
      allCategories: copyOfCategories
    }, () => console.log(this.state.allCategories))
  }

  formSubmit = event => {
    event.preventDefault();
    this.setState({
      submitStatus: ""
    })
   
    console.log(
      `Store: ${this.state.store}\n Street: ${this.state.street}\n City: ${this.state.city}\n Province: ${this.state.province}\n
      PostalCode: ${this.state.postalCode}\n Date: ${this.state.date}`
    )

    if (this.state.store !== "" &&
        this.state.street !== "" && 
        this.state.city !== "" &&
        this.state.province !== "" &&
        this.state.postalCode !== "" &&
        this.state.date !== "" &&
        this.state.allItems !== [] &&
        this.state.allCategories !== [] &&
        this.state.allCosts !== []) {

    

    for (let i=0; i<this.state.allItems.length; i++) {
      let costNum = this.state.allCosts[i];
      costNum = parseFloat(costNum.replace("$", ""));
      costNum = parseFloat(costNum.toFixed(2))
      let requestObj = {
        store: this.state.store,
        street: this.state.street,
        city: this.state.city,
        province: this.state.province,
        postalCode: this.state.postalCode,
        date: this.state.date,
        item: this.state.allItems[i],
        cost: costNum,
        category: this.state.allCategories[i]
      }
      console.log(requestObj)
      API.saveExpense(requestObj)
        .then(res => {
          console.log("Saved to database!")
          this.setState({
            submitStatus: "Submission successful!"
          })
        })
      .catch(err => console.log(err));
    }
  } else {
    this.setState({
      submitStatus: "Unsuccessful submission! Please ensure all fields are filed out."
    })
    console.log("Missing field")
  }
  }

reUpload = (event) => {
  event.preventDefault();
  console.log("I want to restart")
  this.setState({
    showInput: false,
    file: [],
    store: "",
    allCategories: [],
    allCosts: [],
    allItems: [],
    response: []
  })
}


  render() {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };
    return (
      <div className="container">

      {!this.state.showInput ? 
      <div className="uploadArea">

        <h1>Receipt Upload</h1>
        <ReactDropzone
          accept="image/*"
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
        </div>
        : null}
 
        {this.state.showInput ? 
 <div className="inputForm">
          <button className="btn btn-secondary" onClick={this.reUpload}>
          Start Over
          </button>
          <form>
            <h3>Store:</h3>
            <input
              value={this.state.store}
              onChange={this.handleInputChange}
              // placeholder="Store Name"
              name="store"
            />
            <br />
            <h3>Street Address:</h3>
            <input
              value={this.state.street}
              onChange={this.handleInputChange}
              // placeholder="Street Address of Your Purchase"
              name="street"
            />
            <br />
            <h3>City:</h3>
            <input
              value={this.state.city}
              onChange={this.handleInputChange}
              // placeholder="City of Your Purchase"
              name="city"
            />
            <br />
            <h3>Province:</h3>
            <input
              value={this.state.province}
              onChange={this.handleInputChange}
              // placeholder="Province of Your Purchase"
              name="province"
            />
            <br />
            <h3>Postal Code:</h3>
            <input
              value={this.state.postalCode}
              onChange={this.handleInputChange}
              // placeholder="Postal Code  of Your Purchase"
              name="postalCode"
            />
            <br />
            <h3>Date of the Purchase:</h3>
            <input
              value={this.state.date}
              onChange={this.handleInputChange}
              // placeholder="Date of Your Purchase (YYYY/MM/DD)"
              name="date"
            />
            <br />
            <h3>Items:</h3>
            {this.state.allItems.map((item, index) => (
              <div key={index}>
                <input
                  value={item}
                  onChange={(event) => this.handleItemChange(index, event)}
                  name="allItems"
                />
                <span>
                <input
                value={this.state.allCosts[index]}
                onChange={(event) => this.handleCostChange(index, event)}
                name="allCosts"
                />
                <select name="category" value={this.state.allCategories[index]} onChange={(event) => this.handleCategories(index, event)}>
                  <option value="None">Category</option>
                  <option value="Food">Food</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                </select>
                


                  <button type="submit" onClick={(event) => this.deleteItem(index, event)}>
                  Delete
                  </button>
                  </span>
              </div>
            ))}
            <span className="input-group">
              <button type="submit" onClick={this.formSubmit} className="btn btn-secondary">
                Submit
              </button>
            </span>
          </form>
          <div>
            {this.state.submitStatus}
            </div>
        </div>
        : null }
      </div>
    );
  }
}

export default Upload;
