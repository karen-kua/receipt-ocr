// const db = require("../../models");

// const passport = require('../../passport');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const router = require("express").Router();
const usersController = require("../controllers/usersController");


router.post("/sign-up", usersController.create)

// router.route("/login")
//   .post(usersController.authenticate)

router.get("/login", usersController.login)

router.get("/auth", verifytoken, function (req, res) {
  console.log(req.token)
 jwt.verify(req.token, 'secretkey', (err, authData) => {
  if (err) {
    res.json({
      status: '404',
    });
  } else {
    res.json({
      status: '200',
    });
  };
});
});
  // .get(usersController.verifyToken)

// router.route("/login")
//   .post(passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   }))

// Verify Token
function verifytoken(req, res, next) {
  //Get auth header value
   const bearerHeader = req.headers['authorization'];
  //Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    //Set the token
    req.token = bearerToken;
    //next middleware
    next();

  } else {
    //Forbidden
    res.sendStatus(403);

  }
};



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