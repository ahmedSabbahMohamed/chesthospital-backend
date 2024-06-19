const asyncWrapper = require("../../middlewares/asyncWrapper");
const LabTask = require("../../models/lab/labTask.model");
const LabResult = require("../../models/lab/labResult.model");
const httpStatusText = require("../../utils/httpStatusText");
const appError = require("../../utils/appError");

const getLabTasks = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const tasks = await LabTask.findAll({
    where: {
      doctorId: id,
      status: "pending",
    },
  });
  return res.json({ status: httpStatusText.SUCCESS, data: { tasks } });
});

const completedTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await LabTask.update(
    { status: "completed" },
    { where: { id: id } }
  );
  if (task[0] === 0) {
    const error = appError.create("not found task", 404, httpStatusText.ERROR);
    return next(error);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { task } });
});

const addLabResult = asyncWrapper(async (req, res, next) => {
  const { patientId, doctorId, name } = req.body;
  if (!req.files || req.files.length === 0) {
    const error = appError.create("No files uploaded", 400);
    return next(error);
  }

  const resultPaths = req.files.map((file) => file.filename);
  const results = await LabResult.create({
    patientId,
    doctorId,
    name,
    result: resultPaths,
  });

  return res.json({
    status: httpStatusText.SUCCESS,
    data: { results },
  });
});

module.exports = {
  getLabTasks,
  completedTask,
  addLabResult,
};
