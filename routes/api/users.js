// const db = require("../../models");

const passport = require('../../passport');

const router = require("express").Router();
const usersController = require("../../controllers/usersController");


router.route("/sign-up")
  .post(usersController.create)

// router.route("/login")
//   .post(usersController.authenticate)

router.route("/login")
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))




// function k (req, res) {
// 	console.log("users.js hi")
// 	db.Users
// 	.create(req.body)
// 	.then(dbModel => res.json(dbModel))
// 	.catch(err => res.status(422).json(err));
// }

// router.route("/save")
//   .post(usersController.create)

// router.route("/:id")
//   .delete(usersController.remove)

// router.route("/edit/:id")
//   .get(usersController.findOne);

// router.route("/update/:id")
//   .put(usersController.update);

module.exports = router;