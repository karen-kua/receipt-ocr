import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom'
import API from "../../utils/API";
import ReactDropzone from "react-dropzone";
import axios from "axios"
import DatePicker from 'react-date-picker'
import './Upload.css'

// import DeleteBtn from "../../components/DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

class Upload extends Component {
  state = {
    progress: "0%",
    validationErr: 0, 
    showInput: false,
    file: [],
    response: [],
    day: "",
    month: "",
    year: "",
    fullDate: "",
    datePicker: "",
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

  // componentDidMount() {
  //   this.verifyToken();
  // }

  // verifyToken = () => {
  //     let token = localStorage.getItem('session_token');
  //     console.log(token)
  //     axios.get('/auth', { headers: {"Authorization" : `Bearer ${token}`} })
  //       .then(res => {
  //           console.log(res);
  //       });
      // axios.get('/auth', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
  //     }).then(response => {
  //       console.log(response)
  //       console.log("yay!")
  //       // if(response.ok) {
  //       //   response.json().then(data => {
  //       //     if(data.status != 200) {
  //       //       this.props.verifyTokenFailed();
  //       //     }
  //       //   }).catch(err => console.log(err));
  //       // }
  //     }).catch(err => console.log(err));
  // };

  goToUserInput = event => {
    event.preventDefault();
    this.props.history.push('/upload-user-input')
}

  onDrop = (file) => {
    const token = localStorage.getItem('session_token');
    API.auth(token)
      .then(res => {
        console.log(res.data.status)
        if (res.data.status !== "404") {
          this.uploadReceipt(file)
        } else {
          console.log("Auth failed!")
          this.props.history.push('/login')
        }
      })
      .catch(err => console.log(err))
  }
  
  uploadReceipt = file => {
    let photo = new FormData();
    photo.append('photo', file[0]);
    axios.post('/api/expense/upload', photo, {
      onUploadProgress: (progressEvent) => {
        let percentageCompleted = Math.round((progressEvent.loaded * 100)/
          progressEvent.total);
        percentageCompleted = percentageCompleted.toString() + "%";
        if (percentageCompleted == "100%") {
          percentageCompleted = percentageCompleted.concat("...Please wait while we analyze the image.")
          this.setState({progress:percentageCompleted})
        } else {
          this.setState({progress: percentageCompleted})
        }
      }
    })
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


validateData = () => {
  let errNum = 0;
  for (let i=0; i<this.state.allItems.length; i++) {
    // validation of special characters = true or false 
    const format = /[ !@#%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
    const hasSpecialChar = format.test(this.state.allCosts[i])
    if (
      // validating to see if the cost has no alphabet characters and other special characters
      this.state.allCosts[i] === "" ||
      // isNaN(parseFloat(this.state.allCosts[i])) ||
      /[a-z]/i.test(this.state.allCosts[i]) ||
      hasSpecialChar === true ||
      // validating that the date and item aren't null and that the category isn't unselected 
      this.state.datePicker === "" ||
      this.state.allCategories[i] === "None" ||
      this.state.allCategories[i] === "Category" ||
      this.state.allItems[i] === ""
  ) {
    errNum++
    console.log("Data isn't clean at index" + i)
  } 
}
// If there are 0 errors in the submission, we can submit data into the DB. 
if (errNum === 0) {
this.submitData();
} else {
  this.setState({submitStatus: "Unsuccessful submission! Please ensure all fields are properly filled out."})
}
console.log(`The num of err in this submission: ${errNum}`)
}

submitData = () => {
  const user = localStorage.getItem('user_id');
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
      day: this.state.day,
      month: this.state.month,
      year: this.state.year,
      fullDate: this.state.fullDate,
      item: this.state.allItems[i],
      cost: costNum,
      category: this.state.allCategories[i],
      userId: user
    }
    console.log(requestObj)
    API.saveExpense(requestObj)
      .then(res => {
        console.log("Saved to database!")
        this.setState({
          submitStatus: "Submission successful!"
        })
        this.props.history.push('/upload-success')
      })
    .catch(err => console.log(err));

  }
}

  onFormSubmit = event => {
    event.preventDefault();
    this.setState({submitStatus: ""})
    const token = localStorage.getItem('session_token');
    API.auth(token)
      .then(res => {
        console.log(res.data.status)
        if (res.data.status !== "404") {
          this.validateForm()
        } else {
          console.log("Auth failed!")
          this.props.history.push('/login')
        }
      })
      .catch(err => console.log(err))   
  }
  
  validateForm = () => {
    console.log(
      `Store: ${this.state.store}\n Street: ${this.state.street}\n City: ${this.state.city}\n 
      Province: ${this.state.province}\nPostalCode: ${this.state.postalCode}\n Day: ${this.state.day}\n 
      Month: ${this.state.month}\n Year: ${this.state.year}\n fullDate: ${this.state.fullDate}`
    )
  
    if (this.state.store !== "" &&
        this.state.street !== "" && 
        this.state.city !== "" &&
        this.state.province !== "" &&
        this.state.postalCode !== "" &&
        this.state.datePicker !== "" &&
        this.state.day !== "" &&
        this.state.month !== "" &&
        this.state.year !== "" &&
        this.state.fullDate !== "" &&
        this.state.allItems !== [] &&
        this.state.allCategories !== [] &&
        this.state.allCosts !== []) {
        this.validateData();
  } else {
    this.setState({
      submitStatus: "Unsuccessful submission! Please ensure all fields are filed out."
    })
    console.log("Missing field")
  }
  }

addRows = event => {
  event.preventDefault();
  const copyOfItems = [...this.state.allItems]
  const copyOfCosts = [...this.state.allCosts]
  const copyOfCategories = [...this.state.allCategories]
  copyOfItems.push("")
  copyOfCosts.push("")
  copyOfCategories.push("")
  this.setState({
    allItems: copyOfItems,
    allCosts: copyOfCosts,
    allCategories: copyOfCategories
  })
}

reUpload = event => {
  event.preventDefault();
  console.log("I want to restart")
  this.setState({
    progress: "0%",
    validationErr: 0, 
    showInput: false,
    file: [],
    response: [],
    day: "",
    month: "",
    year: "",
    fullDate: "",
    datePicker: "",
    store: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    allItems: [],
    allCosts: [],
    allCategories: [],
    submitStatus: ""
  })
}

handleDatePicker = date => {
  if (date === null ) {
    console.log("null")
    this.setState({datePicker: date})
  } else {
let keyDate = date.toLocaleString()
keyDate = keyDate.slice(0, keyDate.indexOf(","))
console.log(keyDate)
const keyDateArr = keyDate.split("/")
this.getFullDate(keyDateArr, date);
}
}


getFullDate = (keyDateArr, date) => {
  let fullDateArr = [];
  let dayLength = keyDateArr[1].split("").length
  let monthLength = keyDateArr[0].split("").length
  console.log(dayLength, monthLength)
  fullDateArr.push([keyDateArr[2], keyDateArr[0], keyDateArr[1]])
  fullDateArr = fullDateArr.join("").replace(",", "").replace(",","").split("");
  if (monthLength === 1) {
    fullDateArr.splice(4,0,"0")
  }
  if (dayLength === 1) {
    fullDateArr.splice(6,0,"0")
  }
  const fullDate = fullDateArr.join("")
  console.log(keyDateArr, fullDate)
    this.setState({
      datePicker: date,
      day: parseInt(keyDateArr[1]),
      month: parseInt(keyDateArr[0]),
      year: parseInt(keyDateArr[2]),
      fullDate: parseInt(fullDate)
    }, () => {
      console.log(
        `Day: ${this.state.day}\n, 
        Month: ${this.state.month}\n,
        Year: ${this.state.year}\n,
        fullDate: ${this.state.fullDate}`)
    })
  
}

// RENDER________________________RENDER

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
        <div>
          File upload progress: {this.state.progress}
          </div>
          <button className="btn btn-primary" onClick={this.goToUserInput}>
          I do not have a receipt
          </button>
        </div>
        : null}
 
        {this.state.showInput ? 
 <div className="inputForm">
          
          <form>
            <h3>Store</h3>
            <input
              value={this.state.store}
              onChange={this.handleInputChange}
              // placeholder="Store Name"
              name="store"
            />
            <br />
            <h3>Street Address</h3>
            <input
              value={this.state.street}
              onChange={this.handleInputChange}
              // placeholder="Street Address of Your Purchase"
              name="street"
            />
            <br />
            <h3>City</h3>
            <input
              value={this.state.city}
              onChange={this.handleInputChange}
              // placeholder="City of Your Purchase"
              name="city"
            />
            <br />
            <h3>Province</h3>
            <input
              value={this.state.province}
              onChange={this.handleInputChange}
              // placeholder="Province of Your Purchase"
              name="province"
            />
            <br />
            <h3>Postal Code</h3>
            <input
              value={this.state.postalCode}
              onChange={this.handleInputChange}
              // placeholder="Postal Code  of Your Purchase"
              name="postalCode"
              />
              <br />
            <h3>Date</h3>
              <DatePicker
                onChange={this.handleDatePicker}
                value={this.state.datePicker}
              />
            <br />
            <h3>Items</h3>
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
            {/* <span className="input-group"> */}
            <span>
              <button type="submit" onClick={this.onFormSubmit} className="btn btn-secondary">
                Submit
              </button>
              <button className="btn btn-secondary" onClick={this.addRows}>
          Add More Purchases
          </button>
              <button className="btn btn-secondary" onClick={this.reUpload}>
          Start Over
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
