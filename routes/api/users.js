const router = require("express").Router();

router.route("/sign-up")
  .post(k)

function k (req, res) {
	console.log("users.js hi")
	// db.Users
	// .create(req.body)
	// .then(dbModel => res.json(dbModel))
	// .catch(err => res.status(422).json(err));
}

module.exports = router;