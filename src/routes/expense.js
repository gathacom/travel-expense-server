const { Router } = require("express");
const { getByTrip, getById, store, update, destroy, totalExpenses, totalExpensesByTrip } = require("../controllers/expenseController");
const { isAuthorization } = require("../middlewares/isAuthorization");
const { isAuthor } = require("../middlewares/isAuthor");
const { isValidTrip } = require("../middlewares/isValidTrip");
const { isValidExpense } = require("../middlewares/isValidExpense");
const { expenseSchema } = require("../schemas/expense");
const validate = require("../utils/validate");
const router = Router();

router.get('/expenses/total', isAuthorization, totalExpenses)
router.get('/expenses/total/:tripId', isAuthorization,isAuthor, totalExpensesByTrip)
router.get('/expenses/:tripId', isValidTrip, isAuthor, getByTrip)
router.get('/expense/:tripId/:id',isValidTrip, isValidExpense, isAuthor, getById)
router.post('/expense', isAuthorization, isValidTrip, isAuthor, validate(expenseSchema), store)
router.put('/expense/:tripId/:id',isValidTrip, isValidExpense, isAuthor, validate(expenseSchema), update)
router.delete('/expense/:tripId/:id',isValidTrip, isValidExpense, isAuthor, destroy)

module.exports = router

