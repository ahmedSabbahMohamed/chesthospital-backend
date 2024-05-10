const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Patient = require("../patient.model");
const Employee = require("../employee.model");

const LabRequest = sequelize.define("LabRequest", {
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

LabRequest.belongsTo(Patient, { foreignKey: "patientId" });
LabRequest.belongsTo(Employee, { foreignKey: "doctorId" });

LabRequest.sync()
  .then(() => {
    console.log("LabRequest model synchronized with the database");
  })
  .catch((error) => {
    console.log("Failed to sync LabRequest model:", error);
  });

module.exports = LabRequest;
