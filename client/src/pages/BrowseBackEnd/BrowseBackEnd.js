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


// import Modal from "../../components/Modal";
import React, { Component } from 'react';
import API from '../../utils/API';
import axios from "axios";
import { O_RDONLY } from 'constants';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


///* Class and Super *////
class BrowseBackEnd extends Component {

    state = {
        response: [],
        day: 21,
        month: 12,
        year: 2016,
        category: "",
        query: "liquid Cooler",
        switchExp: "",

        // states for editing a purchase
        editStore: "1",
        editStreet: "2",
        editCity: "3",
        editProvince: "4",
        editPostalCode: "5",
        editDate: "",
        editCategory: "",
        editItem: "9",
        editCost: "10",
        modalIsOpen: false

    }

    // "store" : "Home and Depot",
    // "street" : "1 street",
    // "city" : "Ottawa",
    // "province" : "Ontario",
    // "postalCode" : "M1C 1H9",
    // "day" : 14,
    // "month" : 12,
    // "year" : 2016,
    // "fullDate" : 20161214,
    // "item" : "Liquid Cooler",
    // "cost" : 113.0,
    // "category" : "Electronics",
    // "userID" : 1

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
        let expression = ""
        for (let key in copyOfState) {
            if (copyOfState[key] !== "") {
                expression += key
            }
        }
        console.log(`The switch statement is: ${expression}`)
        this.setState({switchExp: expression}, 
        () => {
            console.log(this.state.switchExp)
            this.requestData(this.state.switchExp)
        })

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

    onDeleteBtnSubmit = (id, event) => {
        event.preventDefault();
        console.log(`This is the id: ${id}`)
        API.deleteExpense(id)
            .then(res => {
                console.log("Deleted");
                this.requestData(this.state.switchExp);
            })
    }

    onEditBtnSubmit = (id, event) => {
        event.preventDefault();
        console.log("Hi")
        this.setState({modalIsOpen: true})
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    afterOpenModal = () => {
        this.subtitle.style.color = '#f00';
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


    handleEdits = event => {
        const { name, value } = event.target;
        console.log({ name, value })
        this.setState({[name]: value})
      };

    render() {
        return (
            <div>
            

                <button onClick={this.onDropDownBtnSubmit}>Drop down button</button>
                <br/><br/>
                <button onClick={this.onSearchBarBtnSubmit}>Search bar button</button>
                <br/><br/>
                {this.state.response.map(expense => (
                <span key={expense._id}>
                <h4>{expense.item}</h4>
                <p>{expense.store}</p>
                <p>{expense.cost}</p>
                <p>{expense.street}</p>
                <button onClick={(event) => this.onEditBtnSubmit(expense._id, event)}>Edit button</button>
                
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Edit Purchase Modal"
                        >

                            <span onClick={this.closeModal}>x</span>
                            <h2 ref={subtitle => this.subtitle = subtitle}>Edit Your Purchase Details</h2>
                            <form>
                          
                                    <h3>Store:</h3>
                                    <input
                                        value={this.state.editStore}
                                        onChange={this.handleEdits}
                                        name="editStore"
                                    />
                                    <br />
                                    <h3>Street Address:</h3>
                                    <input
                                        value={this.state.editStreet}
                                        onChange={this.handleEdits}
                                        name="editStreet"
                                    />
                                    <br />
                                    <h3>City:</h3>
                                    <input
                                        value={this.state.editCity}
                                        onChange={this.handleEdits}
                                        name="editCity"
                                    />
                                    <br />
                                    <h3>Province:</h3>
                                    <input
                                        value={this.state.editProvince}
                                        onChange={this.handleEdits}
                                        name="editProvince"
                                    />
                                    <br />
                                    <h3>Postal Code:</h3>
                                    <input
                                        value={this.state.editPostalCode}
                                        onChange={this.handleEdits}
                                        name="editPostalCode"
                                    />
                                    <br />
                                    <h3>Date:</h3>
                                    {/* <DatePicker
                                        onChange={this.handleDatePicker}
                                        value={this.state.datePicker}
                                    /> */}
                                    <br />
                                    <h3>Item:</h3>
                                    <input
                                        value={this.state.editItem}
                                        onChange={this.handleEdits}
                                        name="editItem"
                                        />
                                    <h3>Cost (eg. 3.50):</h3>
                                    <input
                                        value={this.state.editCost}
                                        onChange={this.handleEdits}
                                        name="editCost"
                                        />
                                    <h3>Category</h3>
                                    <button>Update</button>
                            </form>
                        </Modal>



                <button onClick={(event) => this.onDeleteBtnSubmit(expense._id, event)}>Delete button</button>
                </span>
                ))
            }

            </div>

        )
    }

}

export default BrowseBackEnd;