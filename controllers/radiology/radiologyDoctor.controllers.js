const asyncWrapper = require("../../middlewares/asyncWrapper");
const RadiologistTask = require("../../models/radiologist/radiologistTask.model");
const RadiologyResult = require("../../models/radiologist/radiologyResult.model");
const httpStatusText = require("../../utils/httpStatusText");
const appError = require("../../utils/appError");

const getRadiologistTasks = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const tasks = await RadiologistTask.findAll({
    where: {
      doctorId: id,
      status: "pending",
    },
  });
  return res.json({ status: httpStatusText.SUCCESS, data: { tasks } });
});

const completedTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await RadiologistTask.update(
    { status: "completed" },
    { where: { id: id } }
  );
  if (task[0] === 0) {
    const error = appError.create("not found task", 404, httpStatusText.ERROR);
    return next(error);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { task } });
});

const addRadiologyResult = asyncWrapper(async (req, res, next) => {
  const { notes, patientId, doctorId } = req.body;
  if (!req.files || req.files.length === 0) {
    const error = appError.create("No files uploaded", 400)
    return next(error);
  }

  const resultPaths = req.files.map((file) => file.filename);
  const radiologyResult = await RadiologyResult.create({
    notes,
    patientId,
    doctorId,
    result: resultPaths,
  });

  return res.json({
    status: httpStatusText.SUCCESS,
    data: { radiologyResult },
  });
});


module.exports = {
  getRadiologistTasks,
  completedTask,
  addRadiologyResult,
};
