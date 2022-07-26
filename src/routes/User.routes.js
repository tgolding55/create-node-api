const express = require("express");
const router = express.Router();

const UserController = require("../controllers/User.controllers");

const auth = require("../middleware/auth");

router.post("/", UserController.create_user);
router.post("/login", UserController.login_user);
router.get("/validate", auth, UserController.validate_user);

module.exports = router;
