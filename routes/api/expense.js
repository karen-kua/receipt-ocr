const router = require("express").Router();
const expensesController = require("../../controllers/expensesController");
const multer = require("multer")
const upload = multer({ dest: 'client/pictures'});

// Matches api/expense/upload
// This is for uploading expense through Tesseract OCR
router.route("/upload")
  .post(upload.single('photo'), expensesController.uploadExpense)

// Matches api/expense/save
// This is for saving the expenses to the database
router.route("/save")
  .post(expensesController.create)


// Add your routers below depending on your route paths. Remember, they have /api/


// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
