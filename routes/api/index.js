const router = require("express").Router();
const expenseRoutes = require("./expense");

router.use("/expense", expenseRoutes);

module.exports = router;
