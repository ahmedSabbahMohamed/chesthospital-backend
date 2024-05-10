const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Employee = require("../employee.model");
const Patient = require("../patient.model");

const LabTask = sequelize.define("LabTask", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed"),
    defaultValue: "pending",
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

LabTask.belongsTo(Patient, { foreignKey: "patientId" });
LabTask.belongsTo(Employee, { foreignKey: "doctorId" });

LabTask.sync()
  .then(() => {
    console.log("LabTask model synchronized with the database");
  })
  .catch((error) => {
    console.log("Failed to sync LabTask model:", error);
  });

module.exports = LabTask;
