/*

Categories:
- Food
- Electronics
- Kitchen
- Office
- Clothing & Accessories
- Home
- Transportation
- Travel and Events
- Bills
- Misc

*/



import React, { Component } from 'react';
import API from '../../utils/API';
import axios from "axios";
import { O_RDONLY } from 'constants';

///* Class and Super *////
class BrowseBackEnd extends Component {

    state = {
        response: [],
        day: 21,
        month: 12,
        year: 2016,
        category: "Home",
        query: "liquid Cooler"
    }

    // End of Constructor

    ///////FUNCTIONS/////////

    // search by: 

    // -day only (done) 
    // -month only
    // -year only
    // -category only
    // -day and month only
    // -day and year only
    // -day and category only
    // -month and year only
    // -month and category only
    // -year and category only 
    // -day and month and year only
    // -day and month and year and category (all)



    onDropDownBtnSubmit = event => {
        event.preventDefault();
        let copyOfState = {
            day: this.state.day,
            month: this.state.month,
            year: this.state.year,
            category: this.state.category
        }
        console.log(copyOfState)
        let switchExp = ""
        for (let key in copyOfState) {
            if (copyOfState[key] !== "") {
                switchExp += key
            }
        }
        console.log(`The switch statement is: ${switchExp}`)
        this.requestData(switchExp)

        // let switchExp
        // if (this.state.day !== "" && this.state.month == "" && this.state.year == "" & this.state.category == "") {
        //     switchExp = "day"
        // } else if (this.state.day == "" && this.state.month !== "" && this.state.year == "" & this.state.category == "") {
        //     switchExp = "month"
        // } else if (this.state.day == "" && this.state.month == "" && this.state.year !== "" & this.state.category == "") {
        //     switchExp = "year"
        // } else if (this.state.day == "" && this.state.month == "" && this.state.year == "" & this.state.category !== "") {
        //     switchExp = "category"
        // } else if (this.state.day !== "" && this.state.month !== "" && this.state.year == "" & this.state.category == "") {
        //     switchExp = "day&month"
        // } else if (this.state.day !== "" && this.state.month == "" && this.state.year !== "" & this.state.category == "") {
        //     switchExp = "day&year"
        // } else if (this.state.day !== "" && this.state.month == "" && this.state.year == "" & this.state.category !== "") {
        //     switchExp = "day&category"
        // } else if (this.state.day == "" && this.state.month !== "" && this.state.year !== "" & this.state.category == "") {
        //     switchExp = "month&year"
        // } else if (this.state.day == "" && this.state.month !== "" && this.state.year == "" & this.state.category !== "") {
        //     switchExp = "month&category"
        // } else if (this.state.day == "" && this.state.month == "" && this.state.year !== "" & this.state.category !== "") {
        //     switchExp = "year&category"
        // } else if (this.state.day !== "" && this.state.month !== "" && this.state.year !== "" & this.state.category == "") {
        //     switchExp = "day&month&year"
        // } else if (this.state.day == "" && this.state.month !== "" && this.state.year !== "" & this.state.category !== "") {
        //     switchExp = "month&year&category"
        // } else if (this.state.day !== "" && this.state.month == "" && this.state.year !== "" & this.state.category !== "") {
        //     switchExp = "day&year&category"
        // } else if (this.state.day !== "" && this.state.month !== "" && this.state.year == "" & this.state.category !== "") {
        //     switchExp = "day&month&category"
        // } else if (this.state.day !== "" && this.state.month !== "" && this.state.year !== "" & this.state.category !== "") {
        //     switchExp = "all 4"
        // }
        // console.log(`The switch statement is: ${switchExp}`)
        // this.requestData(switchExp)
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


    
    render() {
        return (
            <div>

                <button onClick={this.onDropDownBtnSubmit}>Drop down button</button>
                <br/><br/>
                <button onClick={this.onSearchBarBtnSubmit}>Search bar button</button>

            </div>

        )
    }

}

export default BrowseBackEnd;