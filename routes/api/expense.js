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

router.route("/:id")
  .delete(expensesController.remove)

router.route("/edit/:id")
  .get(expensesController.findOne);

router.route("/update/:id")
  .put(expensesController.update);

router.route("/browse-day")
  .get(expensesController.browseD)

router.route("/browse-month")
  .get(expensesController.browseM)

router.route("/browse-year")
  .get(expensesController.browseY)

router.route("/browse-category")
  .get(expensesController.browseC)

router.route("/browse-day-month")
  .get(expensesController.browseDM)

router.route("/browse-day-year")
  .get(expensesController.browseDY)

router.route("/browse-day-category")
  .get(expensesController.browseDC)

router.route("/browse-month-year")
  .get(expensesController.browseMY)

router.route("/browse-month-category")
  .get(expensesController.browseMC)

router.route("/browse-year-category")
  .get(expensesController.browseYC)

router.route("/browse-day-month-year")
  .get(expensesController.browseDMY)

router.route("/browse-month-year-category")
  .get(expensesController.browseMYC)

router.route("/browse-day-year-category")
  .get(expensesController.browseDYC)

router.route("/browse-day-month-category")
  .get(expensesController.browseDMC)

router.route("/browse-day-month-year-category")
  .get(expensesController.browseDMYC)

router.route("/browse-search-item")
  .get(expensesController.browseByItem)

  

  // // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
