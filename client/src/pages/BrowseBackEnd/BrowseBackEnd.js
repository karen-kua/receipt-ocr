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


    
    render() {
        return (
            <div>

                <button onClick={this.onSubmit}>HELLO WORLD</button>


            </div>

        )
    }

}

export default BrowseBackEnd;