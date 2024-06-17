const express = require("express");
const nursingAdminControllers = require("../../controllers/nursing/nursingAdmin.controller");
const verifyToken = require("../../middlewares/verifyToken");
const allowedTo = require("../../middlewares/allowedTo");
const employeeRoles = require("../../utils/employeeRoles");
const employeeSpecialization = require("../../utils/employeeSpecialization");
const applyRoutes = require("../../utils/routeHelpers");

const router = express.Router();

const authMiddlewares = [
  verifyToken,
  allowedTo(employeeRoles.ADMIN, employeeSpecialization.NURSE),
];

const routes = [
  {
    path: "/",
    method: "post",
    middleware: [...authMiddlewares],
    handler: nursingAdminControllers.assignTask,
  },
  {
    path: "/",
    method: "get",
    middleware: [...authMiddlewares],
    handler: nursingAdminControllers.getRequests,
  },
  {
    path: "/oxygen",
    method: "get",
    middleware: [...authMiddlewares],
    handler: nursingAdminControllers.getOxygenRequests,
  },
  {
    path: "/completed-tasks",
    method: "get",
    middleware: [...authMiddlewares],
    handler: nursingAdminControllers.getCompletedTasks,
  },
  {
    path: "/:id",
    method: "delete",
    middleware: [...authMiddlewares],
    handler: nursingAdminControllers.deleteOxygenRequest,
  },
];

applyRoutes(router, routes);

module.exports = router;
