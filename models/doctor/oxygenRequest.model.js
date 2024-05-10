const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Patient = require("../../models/patient.model");
const Employee = require("../../models/employee.model");

const OxygenRequest = sequelize.define("OxygenRequest", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  oxygenLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.ENUM("oxygen"),
    defaultValue: "oxygen",
  },
});

OxygenRequest.belongsTo(Patient, { foreignKey: 'patientId' });
OxygenRequest.belongsTo(Employee, { foreignKey: 'doctorId' });

OxygenRequest
    .sync()
    .then(() => {
        console.log("NursingRequest model synchronized with the database");
    })
    .catch((error) => {
        console.log("Failed to sync NursingRequest model:", error);
    });

module.exports = OxygenRequest;
