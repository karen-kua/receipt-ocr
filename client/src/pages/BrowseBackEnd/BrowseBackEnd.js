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
import DatePicker from 'react-date-picker'
import axios from "axios";
// import { O_RDONLY } from 'constants';
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
        day: "",
        month: 12,
        year: 2016,
        category: "",
        query: "latte",
        switchExp: "",

        // states for editing a purchase
        editId: "",
        editStore: "1",
        editStreet: "2",
        editCity: "3",
        editProvince: "4",
        editPostalCode: "5",
        editDate: "",
        editCategory: "",
        editItem: "9",
        editCost: "10",
        modalIsOpen: false,
        datePicker: null,
        editDay: "",
        editMonth: "",
        editYear: "",
        editFullDate: "",
        editMsg: "",

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
            }) .catch(err => console.log(err))
    }

    onEditBtnSubmit = (id, event) => {
        event.preventDefault();
        console.log("Hi")
        API.getOnePurchase(id)
            .then(res => {
                console.log(res.data)
                console.log("Purchase found")
                this.setState({
                    editId: res.data._id,
                    editStore: res.data.store,
                    editStreet: res.data.street,
                    editCity: res.data.city,
                    editProvince: res.data.province,
                    editPostalCode: res.data.postalCode,
                    editCategory: res.data.category,
                    editItem: res.data.item,
                    editCost: res.data.cost,
                    // datePicker: null,
                    modalIsOpen: true})
            }) .catch(err => console.log(err))
    }

    updatePurchase = (id, event) => {
        event.preventDefault();
        console.log(`The id of the item I want to edit: ${this.state.editId}`);
        let reqObj = {
            store: this.state.editStore,
            street: this.state.editStreet,
            city: this.state.editCity,
            province: this.state.editProvince,
            postalCode: this.state.editPostalCode,
            day: this.state.editDay,
            month: this.state.editMonth,
            year: this.state.editYear,
            fullDate: this.state.editFullDate,
            item: this.state.editItem,
            cost: this.state.editCost,
            category: this.state.editCategory
        }
        console.log(reqObj)
        API.updatePurchase(id, reqObj)
            .then(res => {
                this.setState({editMsg: "Update successful!"})
                console.log("Purchase updated")
            }).catch(err => {
                this.setState({editMsg: "Update failed!"})
                console.log(err)
            })
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    afterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    }

    handleDatePicker = date => {
        console.log(date)
        if (date === null ) {
          console.log("null")
          this.setState({datePicker: date})
        } else {
      let keyDate = date.toLocaleString()
      keyDate = keyDate.slice(0, keyDate.indexOf(","))
      console.log(keyDate)
      const keyDateArr = keyDate.split("/")
      this.getFullDate(keyDateArr, date);
      }
      }
      
      getFullDate = (keyDateArr, date) => {
        let fullDateArr = [];
        let dayLength = keyDateArr[1].split("").length
        let monthLength = keyDateArr[0].split("").length
        console.log(dayLength, monthLength)
        fullDateArr.push([keyDateArr[2], keyDateArr[0], keyDateArr[1]])
        fullDateArr = fullDateArr.join("").replace(",", "").replace(",","").split("");
        if (monthLength === 1) {
          fullDateArr.splice(4,0,"0")
        }
        if (dayLength === 1) {
          fullDateArr.splice(6,0,"0")
        }
        const fullDate = fullDateArr.join("")
        console.log(keyDateArr, fullDate)
          this.setState({
            datePicker: date,
            editDay: parseInt(keyDateArr[1]),
            editMonth: parseInt(keyDateArr[0]),
            editYear: parseInt(keyDateArr[2]),
            editFullDate: parseInt(fullDate)
          }, () => {
            console.log(
              `Day: ${this.state.editDay}\n, 
              Month: ${this.state.editMonth}\n,
              Year: ${this.state.editYear}\n,
              fullDate: ${this.state.editFullDate}`)
          })
        
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
                            <h3>{this.state.editMsg}</h3>
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
                                    <DatePicker
                                        onChange={this.handleDatePicker}
                                        value={this.state.datePicker}
                                    />
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
                                <select name="editCategory" value={this.state.editCategory} onChange={this.handleEdits}>
                                    <option value="None">Category</option>
                                    <option value="Food">Food</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Clothing">Clothing</option>
                                </select>
                                    <button onClick={(event) => this.updatePurchase(this.state.editId, event)}>Update</button>
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