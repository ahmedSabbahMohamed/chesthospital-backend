const employeeSpecialization = require("../utils/employeeSpecialization");

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const employeeRoles = require("../utils/employeeRoles");

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.ENUM(
      employeeSpecialization.MANAGER,
      employeeSpecialization.RADIOLOGIST,
      employeeSpecialization.DOCTOR,
      employeeSpecialization.LAB,
      employeeSpecialization.NURSE,
      employeeSpecialization.PHARMACY,
      employeeSpecialization.RECEPTIONIST,
    ),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(
        employeeRoles.ADMIN,
        employeeRoles.EMPLOYEE,
    ),
    allowNull: false,
  },
});

Admin.sync()
  .then(() => {
    console.log("Admin model synchronized with the database");
  })
  .catch((error) => {
    console.error("Failed to sync Admin model:", error);
  });

module.exports = Admin;
