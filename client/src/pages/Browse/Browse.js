// /*

// Browse receipts by month and by category

// Categories:
// - Food
// - Electronics
// - Kitchen
// - Office
// - Clothing & Accessories
// - Home
// - Transportation
// - Travel and Events
// - Bills
// - Misc

// */

import React, { Component } from 'react';
import API from '../../utils/API';
import Table from '../../components/BrowseTable'
//CSS File - Also governs BrowseTable
import '../Browse/Browse.css'


///* Class and Super *////
class Browse extends Component {
    state = {
        response: [],
        day: "",
        month: "",
        year: "",
        category: "",
        query: "",
        switchExp: "",

        // states for editing a purchase
        editId: "",
        editStore: "1",
        editStreet: "2",
        editCity: "3",
        editProvince: "4",
        editPostalCode: "5",
        editDate: "",
        editCategory: "",
        editItem: "9",
        editCost: "10",
        modalIsOpen: false,
        datePicker: null,
        editDay: "",
        editMonth: "",
        editYear: "",
        editFullDate: "",
        editMsg: "",

    }


    


    handleDateChange = event => {
        let { name, value } = event.target;
        value = parseInt(value)
        console.log({ name, value })
        this.setState({[name]: value})
    }

    handleCategoryQueryChange = event => {
        let { name, value } = event.target;
        console.log({ name, value })
        this.setState({[name]: value})
    }
    

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
            console.log(`The switch statement is: ${expression}`)
            this.setState({switchExp: expression}, 
            () => {
                console.log(this.state.switchExp)
                this.requestData(this.state.switchExp)
            })
        }

        onSearchBarBtnSubmit = event => {
            event.preventDefault();
            let switchExp = "searchBar";
            console.log(`The switch statement is: ${switchExp}`)
            this.requestData(switchExp);
        }
    

        requestData = switchExp => {
            let reqObj;
            switch (switchExp) {
                case "day":
                    console.log("day");
                    reqObj = {
                        day: this.state.day
                    }
                    console.log(reqObj)
                    API.browseD(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "month":
                    console.log("month");
                    reqObj = {
                        month: this.state.month
                    }
                    console.log(reqObj)
                    API.browseM(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "year":
                    console.log("year");
                    reqObj = {
                        year: this.state.year
                    }
                    console.log(reqObj)
                    API.browseY(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "category":
                    console.log("category");
                    reqObj = {
                        category: this.state.category
                    }
                    console.log(reqObj)
                    API.browseC(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "daymonth":
                    console.log("day&month");
                    reqObj = {
                        day: this.state.day,
                        month: this.state.month
                    }
                    console.log(reqObj)
                    API.browseDM(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "dayyear":
                    console.log("day&year");
                    reqObj = {
                        day: this.state.day,
                        year: this.state.year
                    }
                    console.log(reqObj)
                    API.browseDY(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "daycategory":
                    console.log("day&category");
                    reqObj = {
                        day: this.state.day,
                        category: this.state.category
                    }
                    console.log(reqObj)
                    API.browseDC(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "monthyear":
                    console.log("month&year");
                    reqObj = {
                        month: this.state.month,
                        year: this.state.year
                    }
                    console.log(reqObj)
                    API.browseMY(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "monthcategory":
                    console.log("month&category");
                    reqObj = {
                        month: this.state.month,
                        category: this.state.category
                    }
                    console.log(reqObj)
                    API.browseMC(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "yearcategory":
                    console.log("year&category");
                    reqObj = {
                        year: this.state.year,
                        category: this.state.category
                    }
                    console.log(reqObj)
                    API.browseYC(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "daymonthyear":
                    console.log("day&month&year");
                    reqObj = {
                        day: this.state.day,
                        month: this.state.month,
                        year: this.state.year
                    }
                    console.log(reqObj)
                    API.browseDMY(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "monthyearcategory":
                    console.log("month&year&category");
                    reqObj = {
                        month: this.state.month,
                        year: this.state.year,
                        category: this.state.category
                    }
                    console.log(reqObj)
                    API.browseMYC(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "dayyearcategory":
                    console.log("day&year&category");
                    reqObj = {
                        day: this.state.day,
                        year: this.state.year,
                        category: this.state.category
                    }
                    console.log(reqObj)
                    API.browseDYC(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "daymonthcategory":
                    console.log("day&month&category");
                    reqObj = {
                        day: this.state.day,
                        month: this.state.month,
                        category: this.state.category
                    }
                    console.log(reqObj)
                    API.browseDMC(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "daymonthyearcategory":
                    console.log("all 4");
                    reqObj = {
                        day: this.state.day,
                        month: this.state.month,
                        year: this.state.year,
                        category: this.state.category
                    }
                    console.log(reqObj)
                    API.browseDMYC(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                case "searchBar":
                    console.log("searchBar");
                    reqObj = {
                        item: this.state.query
                    }
                    console.log(reqObj)
                    API.browseByItem(reqObj)
                        .then(res => {
                            this.setState({ response: res.data })
                            console.log(this.state.response)
                        })
                        .catch(err => console.log(err))
                    break;
                default:
                    console.log("Nothing matched")
            }
        }


    ////// RENDER /////////
    render() {
        return (

            //   -----This is the dropdown jsx using the regular html dropdowns-----
            <div>
            
                <div className="category-dropdowns">
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

                         <form className="active-cyan-4 mb-4">
                    <input  className="form-control"
                        placeholder="Search by Item Name..."
                        value={this.state.query}
                        name="query"
                        onChange={this.handleCategoryQueryChange}
                    />
                     <button className="btn btn-danger" onClick={this.onSearchBarBtnSubmit}>Search</button>
                </form>
                </div>

            <div>
                <Table />
            </div>
            
           
                <div class="sum-box">
               
               <div>
               <h2>Total Expenses:</h2>
               </div>
               </div>


        
            </div>

        )
    }
    
    }
    export default Browse;
