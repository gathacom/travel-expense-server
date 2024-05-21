const { Router } = require("express");
const { showAll, getById, getByAuthor, store, update, destroy } = require("../controllers/tripController");
const validate = require("../utils/validate");
const { tripSchema } = require("../schemas/trip");
const { isAuthorization } = require("../middlewares/isAuthorization");
const { isAuthor } = require("../middlewares/isAuthor");
const { isValidTrip } = require("../middlewares/isValidTrip");
const router = Router();

router.get('/trips', showAll)
router.get('/trip/:tripId',isValidTrip, isAuthor, getById)
router.get('/tripsByAuthor',isAuthorization, getByAuthor)
router.post('/trip',isAuthorization, validate(tripSchema), store)
router.patch('/trip/:tripId',isValidTrip, isAuthor, update)
router.delete('/trip/:tripId',isValidTrip, isAuthor, destroy)

module.exports = router

