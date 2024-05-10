const { DataTypes } = require('sequelize');
const sequelize = require("../../config/db");
const Patient = require("../patient.model");
const Employee = require("../employee.model");

const RadiologyRequests = sequelize.define("RadiologyRequests", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: "id",
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "id",
    },
  },
});

RadiologyRequests.belongsTo(Patient, { foreignKey: "patientId" });
RadiologyRequests.belongsTo(Employee, { foreignKey: "doctorId" });

RadiologyRequests
  .sync()
  .then(() => {
    console.log("RadiologyRequests model synchronized with the database");
  })
  .catch((error) => {
    console.log("Failed to sync RadiologyRequests model:", error);
  });

module.exports = RadiologyRequests;
