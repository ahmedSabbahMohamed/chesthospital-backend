const express = require("express");
const authLoginControllers = require("../../controllers/auth/login.controllers");
const validateData = require("../../middlewares/validations");

const router = express.Router();

router
    .route("/login")
    .get(validateData.validateLoginData, authLoginControllers.login);

module.exports = router;
