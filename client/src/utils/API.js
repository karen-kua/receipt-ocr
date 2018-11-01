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
  },

  browseD: function(day) {
    return axios.get("/api/expense/browse-day", {params: day})
  },

  browseM: function(month) {
    return axios.get("/api/expense/browse-month", {params: month})
  },

  browseY: function(year) {
  return axios.get("/api/expense/browse-year", {params: year})
  },

  browseC: function(category) {
    return axios.get("/api/expense/browse-category", {params: category})
  },

  browseDM: function(dayMonth) {
    return axios.get("/api/expense/browse-day-month", {params: dayMonth})
  },

  browseDY: function(dayYear) {
    return axios.get("/api/expense/browse-day-year", {params: dayYear})
  },

  browseDC: function(dayCategory) {
    return axios.get("/api/expense/browse-day-category", {params: dayCategory})
  },

  browseMY: function(monthYear) {
    return axios.get("/api/expense/browse-month-year", {params: monthYear})
  },

  browseMC: function(monthCategory) {
    return axios.get("/api/expense/browse-month-category", {params: monthCategory})
  },

  browseYC: function(yearCategory) {
    return axios.get("/api/expense/browse-year-category", {params: yearCategory})
  },

  browseDMY: function(dayMonthYear) {
    return axios.get("/api/expense/browse-day-month-year", {params: dayMonthYear})
  },

  browseMYC: function(monthYearCategory) {
    return axios.get("/api/expense/browse-month-year-category", {params: monthYearCategory})
  },

  browseDYC: function(dayYearCategory) {
    return axios.get("/api/expense/browse-day-year-category", {params: dayYearCategory})
  },

  browseDMC: function(dayMonthCategory) {
    return axios.get("/api/expense/browse-day-month-category", {params: dayMonthCategory})
  },

  browseDMYC: function(allFour) {
    return axios.get("/api/expense/browse-day-month-year-category", {params: allFour})
  },

  browseByItem: function(searchQuery) {
    return axios.get("/api/expense/browse-search-item", {params: searchQuery})
  },
};
