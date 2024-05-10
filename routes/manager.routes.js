const express = require("express");
const validateData = require("../middlewares/validations");
const managerControllers = require("../controllers/manager.controllers");
const doctorControllers = require("../controllers/doctor.controllers");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const employeeRoles = require("../utils/employeeRoles");
const employeeSpecialization = require("../utils/employeeSpecialization");
const applyRoutes = require("../utils/routeHelpers");

const router = express.Router();
const authMiddlewares = [
  verifyToken,
  allowedTo(employeeRoles.ADMIN, employeeSpecialization.MANAGER),
];

const routes = [
  {
    path: "/employee",
    method: "post",
    middleware: [validateData.validateEmployeeData, ...authMiddlewares],
    handler: managerControllers.addEmployee,
  },
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
    method: "get",
    middleware: authMiddlewares,
    handler: managerControllers.getExitRequests,
  },
  {
    path: "/:id",
    method: "delete",
    middleware: authMiddlewares,
    handler: managerControllers.deleteExitRequest,
  },
  {
    path: "/:id",
    method: "get",
    middleware: authMiddlewares,
    handler: doctorControllers.getPatient,
  },
  {
    path: "/employee/:id",
    method: "delete",
    middleware: authMiddlewares,
    handler: managerControllers.deleteEmployee,
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
    path: "/oxygen",
    method: "post",
    middleware: [validateData.validateOxygenRequestData, ...authMiddlewares],
    handler: doctorControllers.oxygenRequest,
  },
  {
    path: "/lab",
    method: "post",
    middleware: [validateData.validateLabRequestData, ...authMiddlewares],
    handler: doctorControllers.labRequest,
  },
];

applyRoutes(router, routes);

module.exports = router;
