const db = require("../models");
const Tesseract = require('tesseract.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = {

  uploadExpense: function (req, res, next) {
    console.log(req.file)
    let file = `${req.file.path}`
    Tesseract.create({ langPath: "eng.traineddata" }).recognize(file, 'eng')
      .progress(function (p) { console.log('progress', p) })
      .catch(err => console.error(err))
      .then(function (result) {
        console.log(result.blocks[0].text)
        let newResult = result.blocks[0].text
        if (newResult.includes("\n")) {
          console.log("Includes line break")
          let newLines = newResult.split("\n")
          let newArray = [];
          for (i = 0; i < newLines.length; i++) {
            if (newLines[i] == "" || '') {
              console.log('space');
            } else {
              let newElement = newLines[i] + ","
              newArray.push(newElement)
            }
          }
          console.log(newArray)
          console.log("hello world")
          res.json(newArray)
        }
      })
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res) {
    db.Expense
      .create(req.body)
      .then(dbExpense => {
        return db.Users
          .findOneAndUpdate(
            { _id: ObjectId(req.body.userId) },
            { $push: { expense: dbExpense._id } }, { new: true }
          );
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    db.Expense
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findOne: function (req, res) {
    db.Expense
      .findById({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  update: function (req, res) {
    db.Expense
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  browseByItem: function (req, res) {
    db.Users
      .findOne({ _id: ObjectId(req.query.userId) })
      .populate({
        path: "expense",
        match: {
          userId: req.query.userId,
          item: { $regex: req.query.item, $options: "i" }
        }
      })
      .sort({ fullDate: -1 })
      .then(data => {
        console.log(data.expense)
        res.json(data.expense)
      })
      .catch(err => res.status(422).json(err));
  },

  browseDropDowns: function (req, res) {
    let query = req.query;
    for (let key in query) {
      if (key === "day" || key === "month" || key === "year") {
        query[key] = parseInt(query[key])
      }
    }
    db.Users
      .findOne({ _id: ObjectId(query.userId) })
      .populate({
        path: "expense",
        match: query
      })
      .sort({ fullDate: -1 })
      .then(data => {
        res.json(data.expense)
      })
      .catch(err => res.status(422).json(err));
  },

};
