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
        category: "",
        searchQuery: ""
    }

    // End of Constructor

    ///////FUNCTIONS/////////

    // search by: 

    // -day only
    // -month only
    // -year only
    // -category only
    // -day and month only
    // -day and year only
    // -day and category only
    // -month and year only
    // -month and category only
    // -year and category only 


    onSubmit = () => {
        let switchExp
        if (this.state.day !== "" && this.state.month == "" && this.state.year == "" & this.state.category == "") {
            switchExp = "day"
        } else if (this.state.day == "" && this.state.month !== "" && this.state.year == "" & this.state.category == "") {
            switchExp = "month"
        } else if (this.state.day == "" && this.state.month == "" && this.state.year !== "" & this.state.category == "") {
            switchExp = "year"
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