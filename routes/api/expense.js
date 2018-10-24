const router = require("express").Router();
const expensesController = require("../../controllers/expensesController");
const multer = require("multer")
const upload = multer({ dest: 'client/pictures'});

router.route("/upload")
// This is for uploading expense through Tesseract OCR
  .post(upload.single('photo'), expensesController.uploadExpense)
  

// Add your routers below depending on your route paths. Remember, they have /api/


// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
