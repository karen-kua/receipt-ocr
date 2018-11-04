import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import API from '../../utils/API';
import Table from '../../components/BrowseTable'
import DatePicker from 'react-date-picker'
import axios from "axios";
import Modal from 'react-modal';
//CSS File - Also governs BrowseTable
import '../Browse/Browse.css'

// Styling for the modal recommended by the docs of react-modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

///* Class and Super *////
class Browse extends Component {
    state = {
        // states for searching for purchases 
        response: [],
        day: "",
        month: "",
        year: "",
        category: "",
        query: "",
        switchExp: "",

        // states for editing a purchase
        editId: "",
        editStore: "",
        editStreet: "",
        editCity: "",
        editProvince: "",
        editPostalCode: "",
        editDate: "",
        editCategory: "",
        editItem: "",
        editCost: "",
        modalIsOpen: false,
        datePicker: "",
        editDay: "",
        editMonth: "",
        editYear: "",
        editFullDate: "",
        editMsg: "",

    }

    // Functions for setting the state based on search bar or dropdown inputs
    handleDateChange = event => {
        let { name, value } = event.target;
        value = parseInt(value)
        console.log({ name, value })
        this.setState({ [name]: value })
    }

    handleCategoryQueryChange = event => {
        let { name, value } = event.target;
        console.log({ name, value })
        this.setState({ [name]: value })
    }

    // Functions triggered when clicking a button
    onDropDownBtnSubmit = event => {
        event.preventDefault();
        let copyOfState = {
            day: this.state.day,
            month: this.state.month,
            year: this.state.year,
            category: this.state.category
        }
        console.log(copyOfState)
        let expression = ""
        for (let key in copyOfState) {
            if (
                copyOfState[key] !== "0" &&
                copyOfState[key] !== 0 &&
                copyOfState[key] !== ""
            ) {
                expression += key
            }
        }
        console.log(`The switch expression is: ${expression}`)
        this.setState({ switchExp: expression },
            () => {
                console.log(this.state.switchExp)
                this.requestData(this.state.switchExp)
            })
    }

    onSearchBarBtnSubmit = event => {
        event.preventDefault();
        let switchExp = "searchBar";
        this.setState({ switchExp: switchExp })
        console.log(`The switch statement is: ${switchExp}`)
        this.requestData(switchExp);
    }

    onDeleteBtnSubmit = (id, event) => {
        event.preventDefault();
        console.log(`This is the id: ${id}`)
        API.deleteExpense(id)
            .then(res => {
                console.log("Deleted");
                this.requestData(this.state.switchExp);
            }).catch(err => console.log(err))
    }

    onEditBtnSubmit = (id, event) => {
        event.preventDefault();
        console.log(`The id of the object I want to edit: ${id}`)
        API.getOnePurchase(id)
            .then(res => {
                console.log(res.data)
                console.log("Purchase found")
                this.setState({
                    editId: res.data._id,
                    editStore: res.data.store,
                    editStreet: res.data.street,
                    editCity: res.data.city,
                    editProvince: res.data.province,
                    editPostalCode: res.data.postalCode,
                    editCategory: res.data.category,
                    editItem: res.data.item,
                    editCost: res.data.cost,
                    modalIsOpen: true
                })
            }).catch(err => console.log(err))
    }

    // Functions associated with the modal for editing purchases 

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            editMsg: "",
            datePicker: ""
        });
    }

    afterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    }

    handleEdits = event => {
        const { name, value } = event.target;
        console.log({ name, value })
        this.setState({ [name]: value })
    }

    handleEditCost = event => {
        let value = event.target.value
        console.log(`Edit Costs: ${value}`)
        console.log(parseFloat(value))
        this.setState({ editCost: value })
    }

    handleDatePicker = date => {
        console.log(date)
        if (date === null) {
            console.log("null")
            this.setState({ datePicker: date })
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
        fullDateArr = fullDateArr.join("").replace(",", "").replace(",", "").split("");
        if (monthLength === 1) {
            fullDateArr.splice(4, 0, "0")
        }
        if (dayLength === 1) {
            fullDateArr.splice(6, 0, "0")
        }
        const fullDate = fullDateArr.join("")
        console.log(keyDateArr, fullDate)
        this.setState({
            datePicker: date,
            editDay: parseInt(keyDateArr[1]),
            editMonth: parseInt(keyDateArr[0]),
            editYear: parseInt(keyDateArr[2]),
            editFullDate: parseInt(fullDate)
        }, () => {
            console.log(
                `Day: ${this.state.editDay}\n, 
            Month: ${this.state.editMonth}\n,
            Year: ${this.state.editYear}\n,
            fullDate: ${this.state.editFullDate}`)
        })
    }

    updatePurchase = (id, event) => {
        event.preventDefault();
        const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
        const hasSpecialChar = format.test(this.state.editCost)
        console.log(parseFloat(this.state.editCost))
        console.log("day")
        console.log(this.state.datePicker === "")
        console.log(isNaN(this.state.datePicker))
        if (
            // validating to see if the cost has no alphabet characters and other special characters
            this.state.editCost === "" ||
            isNaN(parseFloat(this.state.editCost)) ||
            /[a-z]/i.test(this.state.editCost) ||
            hasSpecialChar === true ||
            // validating that the date is not null 
            this.state.datePicker === ""
        ) {
            this.setState({ editMsg: "Update failed" })
        } else {
            console.log(`The id of the item I want to edit: ${this.state.editId}`);
            let reqObj = {
                store: this.state.editStore,
                street: this.state.editStreet,
                city: this.state.editCity,
                province: this.state.editProvince,
                postalCode: this.state.editPostalCode,
                day: this.state.editDay,
                month: this.state.editMonth,
                year: this.state.editYear,
                fullDate: this.state.editFullDate,
                item: this.state.editItem,
                cost: parseFloat(this.state.editCost),
                category: this.state.editCategory
            }
            console.log(reqObj)
            API.updatePurchase(id, reqObj)
                .then(res => {
                    this.setState({ editMsg: "Update successful!" })
                    console.log("Purchase updated")
                    this.requestData(this.state.switchExp)
                }).catch(err => {
                    this.setState({ editMsg: "Update failed!" })
                    console.log(err)
                })

        }

    }

    // Creating request bodies and doing API calls to get requested purchases
    requestData = switchExp => {
        const user = localStorage.getItem('user_id');
        let reqObj;
        switch (switchExp) {
            case "day":
                console.log("day");
                reqObj = {
                    userId: user,
                    day: this.state.day
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "month":
                console.log("month");
                reqObj = {
                    userId: user,
                    month: this.state.month
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "year":
                console.log("year");
                reqObj = {
                    userId: user,
                    year: this.state.year
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "category":
                console.log("category");
                reqObj = {
                    userId: user,
                    category: this.state.category
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "daymonth":
                console.log("day&month");
                reqObj = {
                    userId: user,
                    day: this.state.day,
                    month: this.state.month
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "dayyear":
                console.log("day&year");
                reqObj = {
                    userId: user,
                    day: this.state.day,
                    year: this.state.year
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "daycategory":
                console.log("day&category");
                reqObj = {
                    userId: user,
                    day: this.state.day,
                    category: this.state.category
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "monthyear":
                console.log("month&year");
                reqObj = {
                    userId: user,
                    month: this.state.month,
                    year: this.state.year
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "monthcategory":
                console.log("month&category");
                reqObj = {
                    userId: user,
                    month: this.state.month,
                    category: this.state.category
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "yearcategory":
                console.log("year&category");
                reqObj = {
                    userId: user,
                    year: this.state.year,
                    category: this.state.category
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "daymonthyear":
                console.log("day&month&year");
                reqObj = {
                    userId: user,
                    day: this.state.day,
                    month: this.state.month,
                    year: this.state.year
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "monthyearcategory":
                console.log("month&year&category");
                reqObj = {
                    userId: user,
                    month: this.state.month,
                    year: this.state.year,
                    category: this.state.category
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "dayyearcategory":
                console.log("day&year&category");
                reqObj = {
                    userId: user,
                    day: this.state.day,
                    year: this.state.year,
                    category: this.state.category
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "daymonthcategory":
                console.log("day&month&category");
                reqObj = {
                    userId: user,
                    day: this.state.day,
                    month: this.state.month,
                    category: this.state.category
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "daymonthyearcategory":
                console.log("all 4");
                reqObj = {
                    userId: user,
                    day: this.state.day,
                    month: this.state.month,
                    year: this.state.year,
                    category: this.state.category
                }
                console.log(reqObj)
                this.authDropDowns(reqObj)
                break;
            case "searchBar":
                console.log("searchBar");
                const token = localStorage.getItem('session_token');
                API.auth(token)
                    .then(res => {
                        console.log(res.data.status)
                        if (res.data.status !== "404") {
                            this.browseByItem()
                        } else {
                            console.log("Auth failed!")
                            this.props.history.push('/login')
                        }
                    })
                    .catch(err => console.log(err))
                break;
            default:
                console.log("Nothing matched")
        }
    }

    authDropDowns = reqObj => {
        const token = localStorage.getItem('session_token');
        API.auth(token)
            .then(res => {
                console.log(res.data.status)
                if (res.data.status !== "404") {
                    this.browseDropDowns(reqObj)
                } else {
                    console.log("Auth failed!")
                    this.props.history.push('/login')
                }
            })
            .catch(err => console.log(err))
    }

    browseDropDowns = reqObj => {
        API.browseDropDowns(reqObj)
            .then(res => {
                console.log(res.data)
                this.setState({ response: res.data })
                console.log(this.state.response)
            })
            .catch(err => console.log(err))
    }

    browseByItem = () => {
        let reqObj = {
            item: this.state.query
        }
        console.log(reqObj)
        API.browseByItem(reqObj)
            .then(res => {
                this.setState({ response: res.data })
                console.log(this.state.response)
            })
            .catch(err => console.log(err))
    }

    ////// RENDER /////////
    render() {
        return (

            //   -----This is the dropdown jsx using the regular html dropdowns-----
            <div>

                <div className="category-dropdowns">
                    <h2>Search By Date or Category</h2>
                    <select className="btn btn-danger dropdown-toggle" name="day" value={this.state.day} onChange={this.handleDateChange}>
                        <option value="0">Day</option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="4">04</option>
                        <option value="5">05</option>
                        <option value="6">06</option>
                        <option value="7">07</option>
                        <option value="8">08</option>
                        <option value="9">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>

                    <select className="btn btn-danger dropdown-toggle" name="month" value={this.state.month} onChange={this.handleDateChange}>
                        <option value="0">Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>

                    <select className="btn btn-danger dropdown-toggle" name="year" value={this.state.year} onChange={this.handleDateChange}>
                        <option value="0">Year</option>
                        <option value="2000">2000</option>
                        <option value="2001">2001</option>
                        <option value="2002">2002</option>
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                    </select>

                    <select className="btn btn-danger dropdown-toggle" name="category" value={this.state.category} onChange={this.handleCategoryQueryChange}>
                        <option value="0">Category</option>
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

                    <button className="btn btn-danger" onClick={this.onDropDownBtnSubmit}>Search</button>

                    <h2>Search By Item Name </h2>
                    <form className="active-cyan-4 mb-4">
                        <input className="form-control"
                            placeholder="Search by Item Name..."
                            value={this.state.query}
                            name="query"
                            onChange={this.handleCategoryQueryChange}
                        />
                    </form> <button className="btn btn-danger" onClick={this.onSearchBarBtnSubmit}>Search</button>

                </div>

                <div>
                    <Table
                        response={this.state.response}
                        onDeleteBtnSubmit={this.onDeleteBtnSubmit}
                        onEditBtnSubmit={this.onEditBtnSubmit}
                    />
                </div>


                <div class="sum-box">

                    <div>
                        <h2>Total Expenses:</h2>
                    </div>
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Edit Purchase Modal"
                >

                    <span onClick={this.closeModal}>x</span>
                    <h3>{this.state.editMsg}</h3>
                    <h2 ref={subtitle => this.subtitle = subtitle}>Edit Your Purchase Details</h2>
                    <form>

                        <h3>Store:</h3>
                        <input
                            value={this.state.editStore}
                            onChange={this.handleEdits}
                            name="editStore"
                        />
                        <br />
                        <h3>Street Address:</h3>
                        <input
                            value={this.state.editStreet}
                            onChange={this.handleEdits}
                            name="editStreet"
                        />
                        <br />
                        <h3>City:</h3>
                        <input
                            value={this.state.editCity}
                            onChange={this.handleEdits}
                            name="editCity"
                        />
                        <br />
                        <h3>Province:</h3>
                        <input
                            value={this.state.editProvince}
                            onChange={this.handleEdits}
                            name="editProvince"
                        />
                        <br />
                        <h3>Postal Code:</h3>
                        <input
                            value={this.state.editPostalCode}
                            onChange={this.handleEdits}
                            name="editPostalCode"
                        />
                        <br />
                        <h3>Date:</h3>
                        <DatePicker
                            onChange={this.handleDatePicker}
                            value={this.state.datePicker}
                        />
                        <br />
                        <h3>Item:</h3>
                        <input
                            value={this.state.editItem}
                            onChange={this.handleEdits}
                            name="editItem"
                        />
                        <h3>Cost (eg. 3.50):</h3>
                        <input
                            value={this.state.editCost}
                            onChange={this.handleEditCost}
                            name="editCost"
                        />
                        <h3>Category</h3>
                        <select name="editCategory" value={this.state.editCategory} onChange={this.handleEdits}>
                            <option value="None">Category</option>
                            <option value="Food">Food</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                        </select>
                        <button onClick={(event) => this.updatePurchase(this.state.editId, event)}>Update</button>
                    </form>
                </Modal>



            </div>

        )
    }

}
export default Browse;
