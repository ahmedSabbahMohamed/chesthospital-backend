const Employee = require("../models/employee.model");
const ExitRequest = require("../models/doctor/exitRequest.model");
const Patient = require("../models/patient.model");
const Admin = require("../models/admin.model");
const asyncWrapper = require("../middlewares/asyncWrapper");
const httppStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const employeeRoles = require("../utils/employeeRoles");

const addEmployee = asyncWrapper(async (req, res, next) => {
  const { id, name, email, password, phone, address, specialization, role } =
    req.body;

  const existingEmployee = await Employee.findByPk(id);
  if (existingEmployee) {
    const error = appError.create(
      "Employee already exists",
      400,
      httppStatusText.ERROR
    );
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const employeeData = {
    id,
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    specialization,
    role,
  };

  let employee;
  if (role === employeeRoles.ADMIN) {
    employee = await Admin.create(employeeData);
    employee = await Employee.create(employeeData);
  } else {
    employee = await Employee.create(employeeData);
  }

  return res.status(201).json({
    status: httppStatusText.SUCCESS,
    data: { employee },
  });
});

const deleteEmployee = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.destroy({
    where: {
      id: id,
    },
  });
  if (!employee) {
    const error = appError.create(
      "not found employee",
      400,
      httppStatusText.FAIL
    );
    return next(error);
  }
  return res.json({ status: httppStatusText.SUCCESS, data: null });
});

const deleteExitRequest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const request = await ExitRequest.destroy({
    where: {
      id: id,
    },
  });
  if (!request) {
    const error = appError.create(
      "this exit request doesn't exist",
      400,
      httppStatusText.FAIL
    );
    return next(error);
  }
  return res.json({ status: httppStatusText.SUCCESS, data: null });
});

const getExitRequests = asyncWrapper(async (req, res, next) => {
  const requests = await ExitRequest.findAll({
    include: [
      {
        model: Patient,
        as: "Patient", // Use the correct alias defined in your association
        attributes: ["name", "email", "phone", "address"],
      },
    ],
  });
  return res.json({ status: httppStatusText.SUCCESS, data: { requests } });
});

module.exports = {
  addEmployee,
  deleteExitRequest,
  deleteEmployee,
  getExitRequests,
};
