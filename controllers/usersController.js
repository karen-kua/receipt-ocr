const db = require("../models");
const passport = require('../passport');

module.exports = {

    create: function(req, res) {
      db.Users
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    authenticate: function (req, res) {
      passport.authenticate('local'),
          console.log('logged in', req.user);
          var userInfo = {
              username: req.user.username
          };
          res.send(userInfo);
    }

};


// router.post(
//   '/login',
//   function (req, res, next) {
//       console.log('routes/user.js, login, req.body: ');
//       console.log(req.body)
//       next()
//   },
//   passport.authenticate('local'),
//   (req, res) => {
//       console.log('logged in', req.user);
//       var userInfo = {
//           username: req.user.username
//       };
//       res.send(userInfo);
//   }
// )