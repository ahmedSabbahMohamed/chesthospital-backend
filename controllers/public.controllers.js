const Admin = require("../models/admin.model");
const Employee = require("../models/employee.model");
const asyncWrapper = require("../middlewares/asyncWrapper");
const httppStatusText = require("../utils/httpStatusText");

const getAdmins = asyncWrapper(async (req, res, next) => {
  const admins = await Admin.findAll();
  const adminsIds = admins.map(admin => admin.id);
  const doctors = await Employee.findAll({
    where: {
        id: adminsIds
    },
  });
  return res.json({ status: httppStatusText.SUCCESS, data: doctors });
});

module.exports = {
  getAdmins,
};
