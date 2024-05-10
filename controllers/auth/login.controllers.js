const asyncWrapper = require("../../middlewares/asyncWrapper");
const Employee = require("../../models/employee.model");
const generateJWT = require("../../utils/generateJWT");
const bcrypt = require("bcryptjs");
const appError = require("../../utils/appError");
const httpStatusText = require("../../utils/httpStatusText")

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({
    where: {
      email: email,
    },
  });
  if (!employee) {
    const error = appError.create("You aren't one of the staff", 404);
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, employee.password);
  if (!matchedPassword) {
    const error = appError.create("Password is incorrect", 401);
    return next(error);
  }
  const token = await generateJWT({
    email: employee.email,
    id: employee.id,
    role: employee.role,
    specialization: employee.specialization,
  });
  return res.json({ status: httpStatusText.SUCCESS, data: { employee, token } });
});

module.exports = {
  login,
};
