const asyncWrapper = require("../../middlewares/asyncWrapper");
// const RadiologyRequests = require("../../models/doctor/radiologyRequest.model");
const Employee = require("../../models/employee.model");
const RadiologistTask = require("../../models/radiologist/radiologistTask.model");
const Patient = require("../../models/patient.model");
const employeeSpecialization = require("../../utils/employeeSpecialization");
const httpStatusText = require("../../utils/httpStatusText");
const appError = require("../../utils/appError");

// const getRadiologyRequests = asyncWrapper(async (req, res, next) => {
//     const radiologyRequests = await RadiologyRequests.findAll();
//     return res.json({ status: httpStatusText.SUCCESS, data: {radiologyRequests} });
// });

// const finishedTask = asyncWrapper(async (req, res, next) => {
//   const { id } = req.params;
//   const task = await RadiologistTask.destroy({
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

const assignTask = asyncWrapper(async (req, res, next) => {
    const { name, description, deadline, doctorId, patientId } = req.body;
    const radiologist = await Employee.findOne({
      where: {
        id: doctorId,
        specialization: employeeSpecialization.RADIOLOGIST,
      },
    });
    if (!radiologist) {
        const error = appError.create("radiologist not found", 400, httpStatusText.ERROR);
        return next(error);
    }
    const patient = await Patient.findByPk(patientId)
    if (!patient) {
        const error = appError.create(
          "patient not found",
          400,
          httpStatusText.ERROR
        );
        return next(error);
    }
    const task = await RadiologistTask.create({ name, description, deadline, doctorId, patientId });
    return res.status(201).json({ status: httpStatusText.SUCCESS, data: {task} });
});

const getCompletedTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await RadiologistTask.findAll({
    where: {
      status: "completed",
    },
  });
  return res.json({ status: httpStatusText.SUCCESS, data: {tasks}})
});

module.exports = {
    // getRadiologyRequests,
    assignTask,
    // finishedTask,
    getCompletedTasks,
}
