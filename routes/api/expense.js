const router = require("express").Router();
const expensesController = require("../../controllers/expensesController");
const multer = require("multer")
const upload = multer({ dest: 'client/pictures' });

// Matches api/expense/upload
// This is for uploading expense through Tesseract OCR
router.route("/upload")
  .post(upload.single('photo'), expensesController.uploadExpense)

// Matches api/expense/save
// This is for saving the expenses to the database
router.route("/save")
  .post(expensesController.create)

router.route("/browseday")
  .get(expensesController.browseD)

router.route("/browse-month")
  .get(expensesController.browseM)

router.route("/browse-year")
  .get(expensesController.browseY)

router.route("/browse-category")
  .get(expensesController.browseC)
// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
