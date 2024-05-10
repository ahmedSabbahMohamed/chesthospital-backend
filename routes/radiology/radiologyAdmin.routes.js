const express = require("express");
const radiologyAdminControllers = require("../../controllers/radiology/radiologyAdmin.controllers");
const validateData = require("../../middlewares/validations");
const verifyToken = require("../../middlewares/verifyToken");
const allowedTo = require("../../middlewares/allowedTo");
const employeeRoles = require("../../utils/employeeRoles");
const employeeSpecialization = require("../../utils/employeeSpecialization");
const applyRoutes = require("../../utils/routeHelpers");

const router = express.Router();

const authMiddlewares = [
  verifyToken,
  allowedTo(employeeRoles.ADMIN, employeeSpecialization.RADIOLOGIST),
];

const routes = [
  {
    path: "/",
    method: "get",
    middleware: [...authMiddlewares],
    handler: radiologyAdminControllers.getRadiologyRequests,
  },
  {
    path: "/",
    method: "post",
    middleware: [validateData.validateTaskData, ...authMiddlewares],
    handler: radiologyAdminControllers.assignTask,
  },
  {
    path: "/completed-tasks",
    method: "get",
    middleware: [...authMiddlewares],
    handler: radiologyAdminControllers.getCompletedTasks,
  },
  {
    path: "/:id",
    method: "delete",
    middleware: [...authMiddlewares],
    handler: radiologyAdminControllers.finishedTask,
  },
];

applyRoutes(router, routes);

module.exports = router;
