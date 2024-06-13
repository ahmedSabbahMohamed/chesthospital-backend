const asyncWrapper = require("../../middlewares/asyncWrapper");
// const LabRequest = require("../../models/doctor/labRequest.model");
const LabTask = require("../../models/lab/labTask.model");
const Employee = require("../../models/employee.model");
const Patient = require("../../models/patient.model");
const employeeSpecialization = require("../../utils/employeeSpecialization");
const httpStatusText = require("../../utils/httpStatusText");
const appError = require("../../utils/appError");

// const getLabRequests = asyncWrapper(async (req, res, next) => {
//     const requests = await LabRequest.findAll();
//     return res.json({
//       status: httpStatusText.SUCCESS,
//       data: { requests },
//     });
// });

const assignTask = asyncWrapper(async (req, res, next) => {
  const { name, description, deadline, doctorId, patientId } = req.body;
  const labEmployee = await Employee.findOne({
    where: {
      id: doctorId,
      specialization: employeeSpecialization.LAB,
    },
  });
  if (!labEmployee) {
    const error = appError.create(
      "lab employee not found",
      400,
      httpStatusText.ERROR
    );
    return next(error);
  }
  const patient = await Patient.findByPk(patientId);
  if (!patient) {
    const error = appError.create(
      "patient not found",
      400,
      httpStatusText.ERROR
    );
    return next(error);
  }
  const task = await LabTask.create({ name, description, deadline, doctorId, patientId });
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { task } });
});

// const finishedTask = asyncWrapper(async (req, res, next) => {
//   const { id } = req.params;
//   const task = await LabTask.destroy({
//     where: {
//       id: id,
//     },
//   });
//   if (!task) {
//     const error = appError.create("not found task", 404, httpStatusText.ERROR);
//     return next(error);
//   }
//   return res.json({
//     status: httpStatusText.SUCCESS,
//     data: null,
//     message: "task delted successfully",
//   });
// });

const getCompletedTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await LabTask.findAll({
    where: {
      status: "completed",
    },
  });
  return res.json({ status: httpStatusText.SUCCESS, data: { tasks } });
});

module.exports = {
  // getLabRequests,
  assignTask,
  // finishedTask,
  getCompletedTasks,
}
