const express = require("express");
const validateData = require("../middlewares/validations");
const doctorControllers = require("../controllers/doctor.controllers");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const employeeRoles = require("../utils/employeeRoles");
const employeeSpecialization = require("../utils/employeeSpecialization");
const applyRoutes = require("../utils/routeHelpers");

const router = express.Router();

const authMiddlewares = [
  verifyToken,
  allowedTo(employeeRoles.ADMIN, employeeSpecialization.DOCTOR),
];

const routes = [
  {
    path: "/report",
    method: "post",
    middleware: [validateData.validateDiagnoseData, ...authMiddlewares],
    handler: doctorControllers.addReport,
  },
  {
    path: "/radiology",
    method: "post",
    middleware: [validateData.validateRadiologyRequestData, ...authMiddlewares],
    handler: doctorControllers.radiologyRequest,
  },
  {
    path: "/exit-request",
    method: "post",
    middleware: [validateData.validateExitRequestData, ...authMiddlewares],
    handler: doctorControllers.exitRequest,
  },
  {
    path: "/consultation",
    method: "post",
    middleware: [validateData.validateConsultationData, ...authMiddlewares],
    handler: doctorControllers.consultationRequest,
  },
  {
    path: "/medicine",
    method: "post",
    middleware: [validateData.validateMedicineRequestData, ...authMiddlewares],
    handler: doctorControllers.requestMedicine,
  },
  {
    path: "/lab",
    method: "post",
    middleware: [validateData.validateLabRequestData, ...authMiddlewares],
    handler: doctorControllers.labRequest,
  },
  {
    path: "/oxygen",
    method: "post",
    middleware: [validateData.validateOxygenRequestData, ...authMiddlewares],
    handler: doctorControllers.oxygenRequest,
  },
  {
    path: "/:id",
    method: "get",
    middleware: [...authMiddlewares],
    handler: doctorControllers.getPatient,
  },
];

applyRoutes(router, routes);

module.exports = router;
