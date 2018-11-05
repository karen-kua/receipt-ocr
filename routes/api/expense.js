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

router.route("/browse-drop-down")
  .get(expensesController.browseDropDowns)

router.route("/browse-search-item")
  .get(expensesController.browseByItem)


module.exports = router;
