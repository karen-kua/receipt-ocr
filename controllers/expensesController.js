const Tesseract = require('tesseract.js')
// Defining methods for the expensesController
module.exports = {

    uploadExpense: function(req, res, next) {
        console.log(req.file)
        let file = `${req.file.path}`
    
        Tesseract.create({ langPath: "eng.traineddata" }).recognize(file, 'eng')
        .progress(function  (p) { console.log('progress', p)  })
        .catch(err => console.error(err))
        .then(function (result) {
          console.log(result.blocks[0].text)
          let newResult= result.blocks[0].text
          if (newResult.includes("\n")) {
            console.log("Includes line break")
            let newLines = newResult.split("\n")
            let newArray = [];
            for (i=0; i<newLines.length; i++) {
              if (newLines[i] == "" || '') {
                console.log('space');
              } else {
      
                let newElement = newLines[i] + "+++"
                newArray.push(newElement)
              }
            }
            console.log(newArray)
            console.log("hello world")
            res.json(newArray)
          }
      
          // process.exit(0)
        })
    
    
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
