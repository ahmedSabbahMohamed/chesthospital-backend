const express = require("express");
const labEmployeeControllers = require("../../controllers/lab/labEmployee.controllers");
// const validateData = require("../../middlewares/validations");
const appError = require("../../utils/appError");
const multer = require("multer");
const verfiyToken = require("../../middlewares/verifyToken");
const allowedTo = require("../../middlewares/allowedTo");
const employeeRoles = require("../../utils/employeeRoles");
const employeeSpecialization = require("../../utils/employeeSpecialization");
const applyRoutes = require("../../utils/routeHelpers");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `result-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    const error = appError.create("the file must be an image", 400);
    return cb(error, false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter });

const router = express.Router();

const authMiddlewares = [
  verfiyToken,
  allowedTo(employeeRoles.EMPLOYEE, employeeSpecialization.LAB),
];

const routes = [
  {
    path: "/:id",
    method: "get",
    middleware: [...authMiddlewares],
    handler: labEmployeeControllers.getLabTasks,
  },
  {
    path: "/:id",
    method: "patch",
    middleware: [...authMiddlewares],
    handler: labEmployeeControllers.completedTask,
  },
  {
    path: "/lab-result",
    method: "post",
    middleware: [
      // validateData.validateLabResultData,
      upload.array("result", 5),
      ...authMiddlewares,
    ],
    handler: labEmployeeControllers.addLabResult,
  },
];

applyRoutes(router, routes);

module.exports = router;
