import axios from "axios";

export default {
//   // Gets all books
//   getBooks: function() {
//     return axios.get("/api/books");
//   },
//   // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/books/" + id);
//   },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },

  // Saves an expense to the database
  uploadReceipt: function(photo) {
    return axios.post('/api/expense/upload', photo)
  },

  saveExpense: function(expenseData) {
    return axios.post("/api/expense/save", expenseData);
  }
};
