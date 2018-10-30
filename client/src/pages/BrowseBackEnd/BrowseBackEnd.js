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
        day: "",
        month: "",
        year: "",
        category: "Home",
        searchQuery: ""
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
                reqObj = {
                    day: this.state.day
                }
                console.log(reqObj)
                API.browseD(reqObj)
                    // axios.get("/api/expense/browse-day", {params: reqObj})
                    .then(res => {
                        this.setState({ response: res.data })
                        console.log(this.state.response)
                    })
                    .catch(err => console.log(err))
                break;
            case "month":
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
            // case "day&month":
            //     console.log("day&month");
            //      reqObj = {
            //         day: this.state.day,
            //         month: this.state.month
            //     }
            //     API.browseDM(reqObj)
            //     .then(res => this.setState({response: res}))
            //     .catch(err => console.log(err))
            //     break;
            // case "day&year":
            //     console.log("day&year");
            //      reqObj = {
            //         day: this.state.day,
            //         year: this.state.year
            //     }
            //     API.browseDY(reqObj)
            //     .then(res => this.setState({response: res}))
            //     .catch(err => console.log(err))
            //     break;
            // case "day&category":
            //     console.log("day&category");
            //      reqObj = {
            //         day: this.state.day,
            //         category: this.state.category
            //     }
            //     API.browseDC(reqObj)
            //     .then(res => this.setState({response: res}))
            //     .catch(err => console.log(err))
            //     break;
            // case "month&year":
            //     console.log("month&year");
            //      reqObj = {
            //         month: this.state.month,
            //         year: this.state.year
            //     }
            //     API.browseMY(reqObj)
            //     .then(res => this.setState({response: res}))
            //     .catch(err => console.log(err))
            //     break;
            // case "month&category":
            //     console.log("month&category");
            //      reqObj = {
            //         month: this.state.month,
            //         category: this.state.category
            //     }
            //     API.browseMC(reqObj)
            //     .then(res => this.setState({response: res}))
            //     .catch(err => console.log(err))
            //     break;
            // case "year&category":
            //     console.log("year&category");
            //      reqObj = {
            //         year: this.state.year,
            //         category: this.state.category
            //     }
            //     API.browseYC(reqObj)
            //     .then(res => this.setState({response: res}))
            //     .catch(err => console.log(err))
            //     break;
            // case "day&month&year":
            //     console.log("day&month&year");
            //      reqObj = {
            //         day: this.state.day,
            //         month: this.state.month,
            //         year: this.state.year
            //     }
            //     API.browseDMY(reqObj)
            //     .then(res => this.setState({response: res}))
            //     .catch(err => console.log(err))
            //     break;
            // case "all 4":
            //     console.log("all 4");
            //      reqObj = {
            //         day: this.state.day,
            //         month: this.state.month,
            //         year: this.state.year,
            //         category: this.state.category
            //     }
            //     API.browseDMYC(reqObj)
            //     .then(res => this.setState({response: res}))
            //     .catch(err => console.log(err))
            //     break;
            default:
                console.log("Nothing matched")
        }
    }


    render() {
        return (
            <div>

                <button onClick={this.onSubmit}>HELLO WORLD</button>


            </div>

        )
    }

}

export default BrowseBackEnd;