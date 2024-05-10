const express = require("express");
const labAdminControllers = require("../../controllers/lab/labAdmin.controllers");
const validateData = require("../../middlewares/validations");
const verifyToken = require("../../middlewares/verifyToken");
const allowedTo = require("../../middlewares/allowedTo");
const employeeRoles = require("../../utils/employeeRoles");
const employeeSpecialization = require("../../utils/employeeSpecialization");
const applyRoutes = require("../../utils/routeHelpers");

const router = express.Router();

const authMiddlewares = [
  verifyToken,
  allowedTo(employeeRoles.ADMIN, employeeSpecialization.LAB),
];

const routes = [
  {
    path: "/",
    method: "get",
    middleware: [...authMiddlewares],
    handler: labAdminControllers.getLabRequests,
  },
  {
    path: "/",
    method: "post",
    middleware: [validateData.validateTaskData, ...authMiddlewares],
    handler: labAdminControllers.assignTask,
  },
  {
    path: "/completed-tasks",
    method: "get",
    middleware: [...authMiddlewares],
    handler: labAdminControllers.getCompletedTasks,
  },
  {
    path: "/:id",
    method: "delete",
    middleware: [...authMiddlewares],
    handler: labAdminControllers.finishedTask,
  },
];

applyRoutes(router, routes);

module.exports = router;
