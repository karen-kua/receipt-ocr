const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.post("/signup", usersController.create)

router.get("/log-in", usersController.login)

router.get("/auth", verifytoken, function (req, res) {
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

// Verify Token
function verifytoken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = router;