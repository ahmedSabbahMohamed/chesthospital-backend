const express = require("express");
const pharmacistControllers = require("../controllers/pharmacist.controllers");
const validateData = require("../middlewares/validations");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const employeeRoles = require("../utils/employeeRoles");
const employeeSpecialization = require("../utils/employeeSpecialization");
const applyRoutes = require("../utils/routeHelpers");

const router = express.Router();
const authMiddlewares = [
  verifyToken,
  allowedTo(employeeRoles.ADMIN, employeeSpecialization.PHARMACY),
];

const routes = [
  {
    path: "/",
    method: "post",
    middleware: [validateData.validateMedicineData, ...authMiddlewares],
    handler: pharmacistControllers.addMedicine,
  },
  {
    path: "/",
    method: "get",
    middleware: [...authMiddlewares],
    handler: pharmacistControllers.getMedicines,
  },
  {
    path: "/search",
    method: "get",
    middleware: [...authMiddlewares],
    handler: pharmacistControllers.searchMedicine,
  },
  {
    path: "/:id",
    method: "delete",
    middleware: [...authMiddlewares],
    handler: pharmacistControllers.deleteMedicine,
  },
];

applyRoutes(router, routes);

module.exports = router;
