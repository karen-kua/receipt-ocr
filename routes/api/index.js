const router = require("express").Router();
const expenseRoutes = require("./expense");

// Upload routes
router.use("/expense", expenseRoutes);

module.exports = router;
