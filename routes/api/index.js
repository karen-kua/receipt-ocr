const router = require("express").Router();
const expenseRoutes = require("./expense");
const usersRoutes = require("./users");

// Sign-Up routes
router.use("/users", usersRoutes);

// Upload routes
router.use("/expense", expenseRoutes);

module.exports = router;
