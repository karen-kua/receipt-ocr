const router = require("express").Router();
const expenseController = require("../../controllers/expenseController");

// Matches with "/api/expense/upload"
router.route("/upload")
// This is for uploading expense through Tesseract OCR
  .post(expenseController.uploadExpense);

// Add your routers below depending on your route paths. Remember, they have /api/
// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
