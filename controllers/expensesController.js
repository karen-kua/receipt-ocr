// const db = require("../models");
const multer = require("multer")
const upload = multer({
    storage: multer.memoryStorage(),
    // file size limitation in bytes
    limits: { fileSize: 52428800 },
  });
// Defining methods for the expensesController
module.exports = {

    uploadExpense: function(req, res) {
        if (!req.file) {
            console.log("No file received");
            return res.send({
              success: false
            });
        
          } else {
            console.log('file received');
            return res.send({
              success: true
            })
          }
    }

    // All the other back-end callbacks need to go here. 
    // I left the book examples here in case you need them. 

//   findAll: function(req, res) {
//     db.Book
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   findById: function(req, res) {
//     db.Book
//       .findById(req.params.id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   create: function(req, res) {
//     db.Book
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   update: function(req, res) {
//     db.Book
//       .findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     db.Book
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
};
