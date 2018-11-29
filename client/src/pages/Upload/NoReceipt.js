import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom'
import API from "../../utils/API";
import DatePicker from 'react-date-picker'
import './Upload.css'

class NoReceipt extends Component {

    state = {
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
        allItems: [""],
        allCosts: [""],
        allCategories: ["Category"],
        submitStatus: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleItemChange = (index, event) => {
        let copyOfItems = [...this.state.allItems]
        copyOfItems[index] = event.target.value
        this.setState({
            allItems: copyOfItems
        });
    };

    handleCostChange = (index, event) => {
        let copyOfCosts = [...this.state.allCosts]
        copyOfCosts[index] = event.target.value
        this.setState({
            allCosts: copyOfCosts
        });
    };

    handleCategories = (index, event) => {
        let copyOfCategories = [...this.state.allCategories]
        copyOfCategories[index] = event.target.value
        this.setState({
            allCategories: copyOfCategories
        });
    }

    makeAllCategoriesState = data => {
        const copyOfCategories = [];
        for (let i = 0; i < data.length; i++) {
            const element = "Category"
            copyOfCategories.push(element)
        }
        this.setState({
            allCategories: copyOfCategories
        });
    }

    deleteItem = (index, event) => {
        event.preventDefault();
        let copyOfItems = [...this.state.allItems]
        let copyOfCategories = [...this.state.allCategories]
        let copyOfCosts = [...this.state.allCosts]
        copyOfCategories.splice(index, 1)
        copyOfItems.splice(index, 1)
        copyOfCosts.splice(index, 1)
        this.setState({
            allItems: copyOfItems,
            allCategories: copyOfCategories,
            allCosts: copyOfCosts
        });
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
        });
    }

    reUpload = event => {
        event.preventDefault();
        this.setState({
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
            allItems: [""],
            allCosts: [""],
            allCategories: ["Category"],
            submitStatus: ""
        })
    }

    handleDatePicker = date => {
        if (date === null) {
            this.setState({ datePicker: date })
        } else {
            let keyDate = date.toLocaleString()
            keyDate = keyDate.slice(0, keyDate.indexOf(","))
            const keyDateArr = keyDate.split("/")
            this.getFullDate(keyDateArr, date);
        }
    }

    getFullDate = (keyDateArr, date) => {
        let fullDateArr = [];
        let dayLength = keyDateArr[1].split("").length
        let monthLength = keyDateArr[0].split("").length
        fullDateArr.push([keyDateArr[2], keyDateArr[0], keyDateArr[1]])
        fullDateArr = fullDateArr.join("").replace(",", "").replace(",", "").split("");
        if (monthLength === 1) {
            fullDateArr.splice(4, 0, "0")
        }
        if (dayLength === 1) {
            fullDateArr.splice(6, 0, "0")
        }
        const fullDate = fullDateArr.join("")
        this.setState({
            datePicker: date,
            day: parseInt(keyDateArr[1]),
            month: parseInt(keyDateArr[0]),
            year: parseInt(keyDateArr[2]),
            fullDate: parseInt(fullDate)
        });
    }

    validateData = () => {
        let errNum = 0;
        for (let i = 0; i < this.state.allItems.length; i++) {
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
                this.state.allCategories[i] === "" ||
                this.state.allItems[i] === ""
            ) {
                errNum++
            }
        }
        // If there are 0 errors in the submission, we can submit data into the DB. 
        if (errNum === 0) {
            this.submitData();
        } else {
            this.setState({ submitStatus: "Unsuccessful submission! Please ensure all fields are properly filled out." })
        }
    }

    submitData = () => {
        const user = localStorage.getItem('user_id');
        for (let i = 0; i < this.state.allItems.length; i++) {
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
            API.saveExpense(requestObj)
                .then(res => {
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
        this.setState({ submitStatus: "" })
        const token = localStorage.getItem('session_token');
        API.auth(token)
            .then(res => {
                if (res.data.status !== "404") {
                    this.validateForm()
                } else {
                    localStorage.clear()
                    this.props.history.push('/login')
                }
            })
            .catch(err => console.log(err))
    }

    validateForm = () => {
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
        }
    }


    render() {
        return (
            <div className="input-container">

                <div className="inputForm">

                    <form>
                        <h3>Store</h3>
                        <input
                            value={this.state.store}
                            onChange={this.handleInputChange}
                            name="store"
                            placeholder="Enter a Store Name"
                        />
                        <br />
                        <h3>Street Address</h3>
                        <input
                            value={this.state.street}
                            onChange={this.handleInputChange}
                            name="street"
                            placeholder="Enter a Street Name"
                        />
                        <br />
                        <h3>City</h3>
                        <input
                            value={this.state.city}
                            onChange={this.handleInputChange}
                            name="city"
                            placeholder="Enter City"
                        />
                        <br />
                        <h3>Province</h3>
                        <input
                            value={this.state.province}
                            onChange={this.handleInputChange}
                            name="province"
                            placeholder="Enter Province"
                        />
                        <br />
                        <h3>Postal Code</h3>
                        <input
                            value={this.state.postalCode}
                            onChange={this.handleInputChange}
                            name="postalCode"
                            placeholder="Enter Postal Code"
                        />
                        <br />
                        <h3>Date</h3>
                        <DatePicker
                            onChange={this.handleDatePicker}
                            value={this.state.datePicker}
                        />
                        <br />
                        <h3>Items</h3>
                        <div id="allItemsContainer">
                        {this.state.allItems.map((item, index) => (
                            <div key={index}>
                                <input
                                    value={item}
                                    onChange={(event) => this.handleItemChange(index, event)}
                                    name="allItems"
                                    placeholder="Item Name"
                                />
                                <span>
                                    <input
                                        value={this.state.allCosts[index]}
                                        onChange={(event) => this.handleCostChange(index, event)}
                                        name="allCosts"
                                        placeholder="Cost (eg. $3.50)"
                                    />
                                    <select name="category" value={this.state.allCategories[index]} onChange={(event) => this.handleCategories(index, event)}>
                                        <option value="None">Category</option>
                                        <option value="Food">Food</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Kitchen">Kitchen</option>
                                        <option value="Office">Office</option>
                                        <option value="Home">Home</option>
                                        <option value="Transportation">Transportation</option>
                                        <option value="Travel and Events">Travel and Events</option>
                                        <option value="Bills">Bills</option>
                                        <option value="Miscellaneous">Miscellaneous</option>
                                    </select>

                                    <button type="submit" className="btn btn-primary" onClick={(event) => this.deleteItem(index, event)}>
                                        Delete
                                    </button>
                                </span>
                            </div>
                        ))}
                        </div>
                        <span>
                            <button type="submit" onClick={this.onFormSubmit} className="btn btn-secondary">
                                Submit
                            </button>
                            <button className="btn btn-secondary" onClick={this.addRows}>
                                Add More Items
                            </button>
                            <button className="btn btn-secondary" onClick={this.reUpload}>
                                Start Over
                            </button>
                        </span>
                    <div className="submit-error">
                        {this.state.submitStatus}
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default NoReceipt;
