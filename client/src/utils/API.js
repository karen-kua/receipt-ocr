import axios from "axios";

export default {
  
  // Saves an expense to the database
  uploadReceipt: function(photo) {
    return axios.post('/api/expense/upload', photo)
  },
  
  saveExpense: function(expenseData) {
    return axios.post("/api/expense/save", expenseData);
  },
  
  deleteExpense: function(id) {
    return axios.delete("/api/expense/" + id)
  },

  getOnePurchase: function(id) {
    return axios.get("/api/expense/edit/" + id)
  },

  updatePurchase: function(id, reqObj) {
    return axios.put("/api/expense/update/" + id, reqObj)
  },

  browseByItem: function(searchQuery) {
    return axios.get("/api/expense/browse-search-item", {params: searchQuery})
  },

  browseDropDowns: function(reqObj) {
    return axios.get("/api/expense/browse-drop-down", {params: reqObj})
  },

  auth: function(token) {
    return axios.get('/auth', { headers: {"Authorization" : `Bearer ${token}`} })
  },

};
