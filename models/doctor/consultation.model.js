const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Employee = require("../employee.model");
const Patient = require("../patient.model");

const Consultation = sequelize.define("Consultation", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "id",
    },
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: "id",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hospital: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Consultation.belongsTo(Employee, { foreignKey: 'doctorId' });
Consultation.belongsTo(Patient, { foreignKey: 'patientId' });

Consultation.sync()
  .then(() => {
    console.log("Consultation model synchronized with the database");
  })
  .catch((error) => {
    console.log("Failed to sync Consultation model:", error);
  });

module.exports = Consultation;
