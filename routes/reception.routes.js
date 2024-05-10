const express = require("express");
const receptionController = require("../controllers/reception.controllers");
const { validatePatientData } = require("../middlewares/validations");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const employeeRoles = require("../utils/employeeRoles");
const employeeSpecialization = require("../utils/employeeSpecialization");
const applyRoutes = require("../utils/routeHelpers");

const router = express.Router();

const authMiddlewares = [
  verifyToken,
  allowedTo(employeeRoles.ADMIN, employeeSpecialization.RECEPTIONIST),
];

const routes = [
  {
    path: "/",
    method: "post",
    middleware: [validatePatientData, ...authMiddlewares],
    handler: receptionController.addPatient,
  },
  {
    path: "/:patientId",
    method: "get",
    middleware: [...authMiddlewares],
    handler: receptionController.getPatient,
  },
];

applyRoutes(router, routes);

module.exports = router;
