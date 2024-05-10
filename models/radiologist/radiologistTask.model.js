const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Employee = require("../employee.model");
const Patient = require("../patient.model");

const RadiologistTask = sequelize.define("RadiologistTask", {
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

RadiologistTask.belongsTo(Patient, { foreignKey: 'patientId' });
RadiologistTask.belongsTo(Employee, { foreignKey: 'doctorId' });

RadiologistTask
  .sync()
  .then(() => {
    console.log("RadiologistTask model synchronized with the database")
  })
  .catch((error) => {
    console.log("Failed to sync RadiologistTask model:", error);
  })

module.exports = RadiologistTask;
