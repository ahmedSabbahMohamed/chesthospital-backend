const express = require("express");
const nurseControllers = require("../../controllers/nursing/nurse.controllers");
const verifyToken = require("../../middlewares/verifyToken");
const allowedTo = require("../../middlewares/allowedTo");
const employeeRoles = require("../../utils/employeeRoles");
const employeeSpecialization = require("../../utils/employeeSpecialization");
const applyRoutes = require("../../utils/routeHelpers");

const router = express.Router();

const authMiddlewares = [
  verifyToken,
  allowedTo(employeeRoles.EMPLOYEE, employeeSpecialization.NURSE),
];

const routes = [
  {
    path: "/:id",
    method: "get",
    middleware: [...authMiddlewares],
    handler: nurseControllers.getNurseTasks,
  },
  {
    path: "/:id",
    method: "patch",
    middleware: [...authMiddlewares],
    handler: nurseControllers.completedTask,
  },
];

applyRoutes(router, routes);

module.exports = router;
