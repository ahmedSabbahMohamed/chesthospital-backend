const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Employee = require("../employee.model");
const Patient = require("../patient.model");

const NurseTask = sequelize.define("NurseTask", {
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

NurseTask.belongsTo(Patient, { foreignKey: "patientId" });
NurseTask.belongsTo(Employee, { foreignKey: "doctorId" });

NurseTask.sync()
  .then(() => {
    console.log("NurseTask model synchronized with the database");
  })
  .catch((error) => {
    console.log("Failed to sync NurseTask model:", error);
  });

module.exports = NurseTask;
