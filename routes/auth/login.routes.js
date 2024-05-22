const express = require("express");
const authLoginControllers = require("../../controllers/auth/login.controllers");
const validateData = require("../../middlewares/validations");

const router = express.Router();

router
  .route("/login")
  .post(validateData.validateLoginData, authLoginControllers.login);

module.exports = router;
