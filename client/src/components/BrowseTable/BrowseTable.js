import React from "react";
import { Component } from 'react';
// import '../../pages/Browse/Browse.css'
import './BrowseTable.css'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = props => (
    <div className="table-container">
        <table id="data-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Store</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>Province</th>
                    <th>Postal Code</th>
                    <th>Day</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Cost</th>
                    <th>Category</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>
                {props.response.map(expense => (
                <tr key={expense._id}>
                    <td>{expense.item}</td>
                    <td>{expense.store}</td>
                    <td>{expense.street}</td>
                    <td>{expense.city}</td>
                    <td>{expense.province}</td>
                    <td>{expense.postalCode}</td>
                    <td>{expense.day}</td>
                    <td>{expense.month}</td>
                    <td>{expense.year}</td>
                    <td>{expense.cost.toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>
                    <button className="btn btn-danger" onClick={(event) => props.onEditBtnSubmit(expense._id, event)}>Edit</button>
                    </td>
                    <td>
                    <button className="btn btn-danger" onClick={(event) => props.onDeleteBtnSubmit(expense._id, event)}>Delete</button>
                    </td>
                </tr>

                ))}

            </tbody>
           
        </table>
        <div className="sum-export-box">
                <ReactHTMLTableToExcel
                    id="test-xls-button"
                    className="btn btn-danger download-table-xls-button"
                    table="data-table"
                    filename="ocrExpenseTracker"
                    sheet="tablexls"
                    buttonText="Export" />
<h2 id="sum" style={{color:'#db6f68'}}>Total Expenses: {props.sum}</h2>
       </div>
    </div>





)

export default Table; 