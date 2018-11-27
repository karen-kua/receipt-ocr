const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  create: function (req, res) {
    db.Users.findOne({ username: req.body.username })
      .then(dbUser => {
        console.log("user found");
        console.log(dbUser);
        if (dbUser == null) {
          console.log("req.body");
          console.log(req.body);
          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            console.log(hash);
            req.body.password = hash;
            db.Users.create(req.body)
              .then(dbModel => res.json(dbModel))
              .catch(err => res.status(422).json(err));
          });
        } else {
          console.log("user exists already");
          res.json({
            validate: false,
            status: "422"
          });
        }
      })
      .catch(err => {
        res.json({
          validate: false,
          status: "422"
        });
      });
  },

  login: function (req, res) {
    console.log('req.query');
    console.log(req.query);
    db.Users.findOne({ username: req.query.username })
      .then(dbUser => {
        bcrypt.compare(req.query.password, dbUser.password, function (err, response) {
          if (dbUser !== null && response == true) {
            console.log("password is correct")
            let user = dbUser.username;
            jwt.sign(
              { user },
              "secretkey",
              { expiresIn: "3000s" },
              (err, token) => {
                res.json({
                  validate: true,
                  message: "Welcome " + dbUser.username,
                  token: token,
                  id: dbUser._id,
                  username: dbUser.username
                });
              }
            );
            console.log("jwt sent");
          }
          else {
            console.log("password is not correct")
            res.json({
              validate: false,
              status: "422"
            });
          }
          console.log('dbUser')
          console.log(dbUser)
        }
        );
      })
      .catch(err => {
        res.json({
          validate: false,
          status: "422"
        });
      });
  },

  verifyToken: function (req, res) {
    console.log(req.headers.authorization);
    jwt.verify(req.headers.authorization, "secretkey", (err, authData) => {
      if (err) {
        res.json({
          status: "404"
        });
      } else {
        res.json({
          status: "200"
        });
      }
    });
  }
};
