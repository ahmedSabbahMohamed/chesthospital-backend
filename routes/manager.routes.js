const express = require("express");
const validateData = require("../middlewares/validations");
const managerControllers = require("../controllers/manager.controllers");
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
    path: "/employee/:id",
    method: "delete",
    middleware: authMiddlewares,
    handler: managerControllers.deleteEmployee,
  },
];

applyRoutes(router, routes);

module.exports = router;
