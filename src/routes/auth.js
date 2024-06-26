const { Router } = require("express");
const authController = require("../controllers/authController");
const { validateUser } = require("../middlewares/validators");
const validate = require("../utils/validate");
const { userSignInSchema } = require("../schemas/user");
const router = Router();


router.post("/checkUser", authController.checkUser)
router.post("/signup", validate(userSignInSchema),  authController.signUp)
router.post("/signin", authController.signIn)
router.post("/signout", authController.logout)

module.exports = router

