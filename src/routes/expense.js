const { Router } = require("express");
const { show, store, update, destroy } = require("../controllers/expenseController");
const validate = require("../utils/validate");
const router = Router();

router.get('/expense',  show)
router.post('/expense', validate(), store)
router.put('/expense', validate(), update)
router.delete('/expense', destroy)

module.exports = router

