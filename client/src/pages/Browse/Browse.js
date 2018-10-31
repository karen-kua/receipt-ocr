/*

Browse receipts by month and by category

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

    ///////FUNCTIONS/////////

    defaultOption = options[0]
    render() {
        return (

            //   -----This is the dropdown jsx using the regular html dropdowns-----
         
                <select name="category" value={this.state.category} onChange={this.handleDropDown}>
                <option value="">Day</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">01</option>
                <option value="04">02</option>
                <option value="05">01</option>
                <option value="06">02</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="01">01</option>
                <option value="02">02</option>
            </select>
          
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

      
    )
    }

}