const asyncWrapper = require("../../middlewares/asyncWrapper");
const NurseTask = require("../../models/nursing/nurseTask.modle");
const httpStatusText = require("../../utils/httpStatusText");
const appError = require("../../utils/appError");

const getNurseTasks = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const tasks = await NurseTask.findAll({
    where: {
      doctorId: id,
      status: "pending",
    },
  });
  return res.json({ status: httpStatusText.SUCCESS, data: { tasks } });
});

const completedTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await NurseTask.update(
    { status: "completed" },
    { where: { id: id } }
  );
  if (task[0] === 0) {
    const error = appError.create("not found task", 404, httpStatusText.ERROR);
    return next(error);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { task } });
});

module.exports = {
  getNurseTasks,
  completedTask,
};
