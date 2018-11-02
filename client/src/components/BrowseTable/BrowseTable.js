import React from "react";
import {Component} from 'react';
import '../../pages/Browse/Browse.css'

class Table extends Component {
    render() {
        return (
            <div className="data-table">
            <table>
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
                    <th>Add/Delete</th>
                </tr>
            </thead>
      
            <tbody>
            
                  <tr>
      <td>Street</td>
      <td>City</td>
      <td>Province</td>
      <td>Postal Code</td>
      <td>Day</td>
      <td>Month</td>
      <td>Year</td>
      <td>Full Date</td>
      <td>Item</td>
      <td>Cost</td>
      <td>Category</td>
  
      <td>
          <i class="fas fa-plus-square fa-lg"></i>
    
          <i class="fas fa-minus-square fa-lg"></i>
      </td>
    </tr>
   
            </tbody>
            </table>

        </div>
  

        )
    }



}

export default Table; 