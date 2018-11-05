const db = require("../models");
// const passport = require('../passport');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  create: function(req, res) {
    db.Users.findOne({ username: req.body.username })
      .then(dbUser => {
        console.log("user found");
        console.log(dbUser);
        if (dbUser == null) {
          
          // ============================================================================
          console.log('req.body')
          console.log(req.body)
          bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            console.log(hash)
            req.body.password = hash
            db.Users.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
          });
          // ============================================================================

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

  login: function(req, res) {
    console.log(req.query);
    db.Users.findOne({
      username: req.query.username,
      password: req.query.password
    })
      .then(dbUser => {
        console.log(dbUser);
        console.log("user found");
        if (dbUser !== null) {
          let user = dbUser.username;
          jwt.sign(
            { user },
            "secretkey",
            { expiresIn: "300s" },
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
        } else {
          console.log("Email Not found");
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

  verifyToken: function(req, res) {
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

  // let user = dbUser.username;
  // jwt.sign({ user }, 'secretkey', { expiresIn: '300s' }, (err, token) => {
  //     console.log("token: " + token);
  //     res.json({
  //         validate: true,
  //         message: 'Welcome ' + dbUser.username,
  //         token: token,
  //         id: dbUser._id,
  //         username: dbUser.username
  //     });
  // });

  // authenticate: function (req, res) {
  //     //   passport.authenticate('local')
  //     //   console.log('logged in', req.user);

  //     var userInfo = {
  //           username: req.user.username
  //       };
  //       res.send(userInfo);
  // }
};
