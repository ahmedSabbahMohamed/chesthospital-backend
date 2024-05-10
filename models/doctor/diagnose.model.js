const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Patient = require("../patient.model")
const Employee = require("../employee.model")

const Diagnose = sequelize.define("Diagnose", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: 'id',
    },
  },
  diagnose: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Diagnose.belongsTo(Patient, { foreignKey: 'patientId' });
Diagnose.belongsTo(Employee, { foreignKey: 'doctorId' });

Diagnose.sync()
  .then(() => {
    console.log("Diagnose model synchronized with the database");
  })
  .catch((error) => {
    console.error("Failed to sync Diagnose model:", error);
  });

module.exports = Diagnose;
