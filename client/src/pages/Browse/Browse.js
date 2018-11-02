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
export default class Browse extends Component {
    state = {
        response: [],
        day: "",
        month: "",
        year: "",
        category: "Home",
        query:""
    }


    handleDropDown = (event) => {
        this.setState({
            category: event.target.value
        }, () => console.log(this.state.category)
        );
        console.log("This is the event value: " + event.target.value)
    }


    handleDayDropDown = (event) => {
        // renders it as a number rather than a string 
        let day = parseInt(event.target.value)
        this.setState({
            day: day
            
        }, () => console.log(typeof this.state.day)
    );
    }

    handleMonthDropDown = (event) => {
        let month = parseInt(event.target.value)
        this.setState({
            month: month
        }, () => console.log(this.state.month)
    );
    }

    handleYearDropDown = (event) => {
        let year = parseInt(event.target.value)
        this.setState({
            year: year
        }, () => console.log(this.state.year)
    );
    }
    
    handleInputChange = () => {
        this.setState({
            query: this.search.value
          }, () => console.log(this.state.query)
        );
        }
    

    // End of Constructor

//     ///////FUNCTIONS/////////


    onSubmit = () => {
        let switchExp
        if (this.state.day !== "" && this.state.month == "" && this.state.year == "" & this.state.category == "") {
            switchExp = "day"
        } else if (this.state.day == "" && this.state.month !== "" && this.state.year == "" & this.state.category == "") {
            switchExp = "month"
        } else if (this.state.day == "" && this.state.month == "" && this.state.year !== "" & this.state.category == "") {
            switchExp = "year"
        } else if (this.state.day == "" && this.state.month == "" && this.state.year == "" & this.state.category !== "") {
            switchExp = "category"
        } else if (this.state.day !== "" && this.state.month !== "" && this.state.year == "" & this.state.category == "") {
            switchExp = "day&month"
        } else if (this.state.day !== "" && this.state.month == "" && this.state.year !== "" & this.state.category == "") {
            switchExp = "day&year"
        } else if (this.state.day !== "" && this.state.month == "" && this.state.year == "" & this.state.category !== "") {
            switchExp = "day&category"
        } else if (this.state.day == "" && this.state.month !== "" && this.state.year !== "" & this.state.category == "") {
            switchExp = "month&year"
        } else if (this.state.day == "" && this.state.month !== "" && this.state.year == "" & this.state.category !== "") {
            switchExp = "month&category"
        } else if (this.state.day == "" && this.state.month == "" && this.state.year !== "" & this.state.category !== "") {
            switchExp = "year&category"
        } else if (this.state.day !== "" && this.state.month !== "" && this.state.year !== "" & this.state.category == "") {
            switchExp = "day&month&year"
        } else if (this.state.day == "" && this.state.month !== "" && this.state.year !== "" & this.state.category !== "") {
            switchExp = "month&year&category"
        } else if (this.state.day !== "" && this.state.month == "" && this.state.year !== "" & this.state.category !== "") {
            switchExp = "day&year&category"
        } else if (this.state.day !== "" && this.state.month !== "" && this.state.year == "" & this.state.category !== "") {
            switchExp = "day&month&category"
        } else if (this.state.day !== "" && this.state.month !== "" && this.state.year !== "" & this.state.category !== "") {
            switchExp = "all 4"
        }
        console.log(`The switch statement is: ${switchExp}`)
        this.requestData(switchExp)
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
            case "day&month":
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
            case "day&year":
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
            case "day&category":
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
            case "month&year":
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
            case "month&category":
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
            case "year&category":
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
            case "day&month&year":
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
            case "month&year&category":
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
            case "day&year&category":
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
            case "day&month&category":
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
            case "all 4":
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
                <select className="btn btn-danger dropdown-toggle" name="category" value={this.state.category} onChange={this.handleDropDown}>
                        <option value="00">Day</option>
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
                    </select>
                    <select className="btn btn-danger dropdown-toggle" name="category" value={this.state.category} onChange={this.handleDropDown}>
                        <option value="placeholder">Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                     
                    </select>

                    <select className="btn btn-danger dropdown-toggle" name="category" value={this.state.category} onChange={this.handleDropDown}>
                        <option value="placeholder">Year</option>
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

                    <select className="btn btn-danger dropdown-toggle" name="category" value={this.state.category} onChange={this.handleDropDown}>
                        <option value="placeholder">Category</option>
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

                        <button className="btn btn-danger" onClick={this.onSubmit}>Submit</button>

                         <form className="active-cyan-4 mb-4">
                    <input  className="form-control"
                        placeholder="Search Expenses..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    />
                     <button className="btn btn-danger" onClick={this.onSubmit}>Search</button>
                </form>
                </div>

            <div>
                <Table />
            </div>
               

        
            </div>

        )
    }

}
