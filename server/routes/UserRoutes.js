const router = require("express").Router();
const UserController = require("./../controllers/UserController");

router.post("/login", UserController.postLogin);
router.post("/signup", UserController.postSignup);

module.exports = router;
