const express = require("express");
const {
  medicineRequests,
  labRequests,
  deleteMedicineRequest,
  deleteLabRequest,
  getMedicineList,
  getPatient,
  radiologyRequests,
  deleteRadiologyRequest,
} = require("../controllers/sharedControllers");
const verifyToken = require("../middlewares/verifyToken");
const applyRoutes = require("../utils/routeHelpers");
const allowedTo = require("../middlewares/allowedTo");
const employeeSpecialization = require("../utils/employeeSpecialization");
const employeeRole = require("../utils/employeeRoles");

const router = express.Router();
const authMiddlewares = [verifyToken];

const routes = [
  {
    path: "/medicine-requests",
    method: "get",
    middleware: [
      // allowedTo(employeeSpecialization.NURSE, employeeSpecialization.PHARMACY),
      ...authMiddlewares,
    ],
    handler: medicineRequests,
  },
  {
    path: "/medicine-requests/:id",
    method: "delete",
    middleware: [
      // allowedTo(employeeSpecialization.NURSE, employeeSpecialization.PHARMACY),
      ...authMiddlewares,
    ],
    handler: deleteMedicineRequest,
  },
  {
    path: "/lab-requests",
    method: "get",
    middleware: [
      // allowedTo(employeeSpecialization.LAB, employeeSpecialization.NURSE),
      ...authMiddlewares,
    ],
    handler: labRequests,
  },
  {
    path: "/lab-requests/:id",
    method: "delete",
    middleware: [
      // allowedTo(employeeSpecialization.NURSE, employeeSpecialization.LAB),
      ...authMiddlewares,
    ],
    handler: deleteLabRequest,
  },
  {
    path: "/radiology-requests",
    method: "get",
    middleware: [
      // allowedTo(
      //   employeeSpecialization.NURSE,
      //   employeeSpecialization.RADIOLOGIST
      // ),
      ...authMiddlewares,
    ],
    handler: radiologyRequests,
  },
  {
    path: "/radiology-requests/:id",
    method: "delete",
    middleware: [
      // allowedTo(
      //   employeeSpecialization.NURSE,
      //   employeeSpecialization.RADIOLOGIST
      // ),
      ...authMiddlewares,
    ],
    handler: deleteRadiologyRequest,
  },
  {
    path: "/medicines",
    method: "get",
    middleware: [...authMiddlewares],
    handler: getMedicineList,
  },
  {
    path: "/patients/:id",
    method: "get",
    middleware: [
      // allowedTo(employeeSpecialization.DOCTOR, employeeSpecialization.MANAGER),
      ...authMiddlewares,
    ],
    handler: getPatient,
  },
];

applyRoutes(router, routes);

module.exports = router;
