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

///* Class and Super *////
export default class Browse extends Component {

    handleDropDown = (event) => {
        this.setState({
            category: event.target.value
        }, () => console.log(this.state.category)
        );
        console.log("This is the event value: " + event.target.value)
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
                <div>
                    <select name="category" value={this.state.category} onChange={this.handleDropDown}>
                        <option value="none">Day</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
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
                </div>

                <div>
                    <button onClick={this.onSubmit}>Submit</button>
                </div>


                <div className="category-dropdowns">
                    <select name="category" value={this.state.category} onChange={this.handleDropDown}>
                        <option value="Clothing">Month</option>
                        <option value="Food">Food</option>
                        <option value="Electronics">Electronics</option>
                    </select>

                    <select name="category" value={this.state.category} onChange={this.handleDropDown}>
                        <option value="Clothing">Year</option>
                        <option value="Food">Food</option>
                        <option value="Electronics">Electronics</option>
                    </select>

                    <select name="category" value={this.state.category} onChange={this.handleDropDown}>
                        <option value="Clothing">Category</option>
                        <option value="Food">Food</option>
                        <option value="Electronics">Electronics</option>
                    </select>
                </div>

                <div className="data-table">
                    <thead>
                        <tr>
                            <th>Street</th>
                            <th>City</th>
                            <th>Province</th>
                            <th>Postal Code</th>
                            <th>Day</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Full Date</th>
                            <th>Item</th>
                            <th>Cost</th>
                            <th>Category</th>
                        </tr>

                    </thead>
                    <tbody>

                        
                    </tbody>


                </div>
        
            </div>

        )
    }

}
