const router = require("express").Router();
const expenseController = require("../../controllers/expenseController");
import multer from "multer"
let upload = multer({ dest: './client/pictures'});
// const upload = multer({
//   storage: multer.memoryStorage(),
//   // file size limitation in bytes
//   limits: { fileSize: 52428800 },
// });
// Matches with "/api/expense/upload"
router.route("/upload")
// This is for uploading expense through Tesseract OCR
  // .post(upload.single('avatar'), expenseController.uploadExpense);
  .post(upload.single('photo'), (req, res, next) => {
    // if (!req.file) {
    //   console.log("No file received");
    //   return res.send({
    //     success: false
    //   });
  
    // } else {
    //   console.log('file received');
    //   return res.send({
    //     success: true
    //   })
    // }
    console.log("hello world")
    res.json(req.file)
  });

// Add your routers below depending on your route paths. Remember, they have /api/
// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
