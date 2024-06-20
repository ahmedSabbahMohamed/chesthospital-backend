const asyncWrapper = require("../../middlewares/asyncWrapper");
const MedicineRequest = require("../../models/doctor/medicineRequest.model");
const OxygenRequest = require("../../models/doctor/oxygenRequest.model");
const Employee = require("../../models/employee.model");
const Patient = require("../../models/patient.model");
const NurseTask = require("../../models/nursing/nurseTask.modle");
const httpStatusText = require("../../utils/httpStatusText");
const employeeSpecialization = require("../../utils/employeeSpecialization");
const appError = require("../../utils/appError");

const getRequests = asyncWrapper(async (req, res, next) => {
  const requests = await MedicineRequest.findAll();
  return res.json({
    status: httpStatusText.SUCCESS,
    data: { requests },
  });
});

const getOxygenRequests = asyncWrapper(async (req, res, next) => {
  const requests = await OxygenRequest.findAll();
  return res.json({
    status: httpStatusText.SUCCESS,
    data: { requests },
  });
});

const assignTask = asyncWrapper(async (req, res, next) => {
  const { name, description, deadline, doctorId, patientId } = req.body;
  const nurse = await Employee.findOne({
    where: {
      id: doctorId,
      specialization: employeeSpecialization.NURSE,
    },
  });
  if (!nurse) {
    const error = appError.create("nurse not found", 400, httpStatusText.ERROR);
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
  const task = await NurseTask.create({
    name,
    description,
    deadline,
    doctorId,
    patientId,
  });
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { task } });
});

const finishedTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await NurseTask.destroy({
    where: {
      id: id,
    },
  });
  if (!task) {
    const error = appError.create("not found task", 404, httpStatusText.ERROR);
    return next(error);
  }
  return res.json({
    status: httpStatusText.SUCCESS,
    data: null,
    message: "task delted successfully",
  });
});

const getCompletedTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await NurseTask.findAll({
    where: {
      status: "completed",
    },
  });
  return res.json({ status: httpStatusText.SUCCESS, data: { tasks } });
});

const deleteOxygenRequest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const request = await OxygenRequest.destroy({
    where: {
      id: id,
    },
  });
    if (!request) {
      return res
        .status(404)
        .json({ status: httpStatusText.ERROR, message: "not found request" });
    }
    return res.json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getRequests,
  assignTask,
  finishedTask,
  getCompletedTasks,
  getOxygenRequests,
  deleteOxygenRequest,
};
