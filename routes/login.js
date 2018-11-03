const router = require("express").Router();
const expensesController = require("../../controllers/expensesController");


router.route("/login")
  .get(usersController.authenticate)
 
module.exports = router;