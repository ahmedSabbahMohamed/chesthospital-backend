const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Patient = require("../patient.model");
const Employee = require("../employee.model");

const NursingRequest = sequelize.define("NursingRequest", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  request: {
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

NursingRequest.belongsTo(Patient, { foreignKey: "patientId" });
NursingRequest.belongsTo(Employee, { foreignKey: "doctorId" });

NursingRequest.sync()
  .then(() => {
    console.log("NursingRequest model synchronized with the database");
  })
  .catch((error) => {
    console.log("Failed to sync NursingRequest model:", error);
  });

module.exports = NursingRequest;
