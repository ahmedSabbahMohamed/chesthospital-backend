const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Patient = require("../patient.model");
const Employee = require("../employee.model");
const Medicine = require("../pharmacist/medicine.model");

const ExitRequest = sequelize.define("ExitRequest", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    unique: true,
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
  }
});

ExitRequest.belongsTo(Patient, { foreignKey: "patientId" });
ExitRequest.belongsTo(Employee, { foreignKey: "doctorId" });


ExitRequest.sync()
  .then(() => {
    console.log("ExitRequest model synchronized with the database");
  })
  .catch((error) => {
    console.error("Failed to sync ExitRequest model:", error);
  });

module.exports = ExitRequest;
