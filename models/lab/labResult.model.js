const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Patient = require("../../models/patient.model");
const Employee = require("../../models/employee.model");

const LabResult = sequelize.define("LabResult", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  notes: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  result: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("result");
      return rawValue ? rawValue.split(",") : [];
    },
    set(value) {
      this.setDataValue("result", value.join(","));
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
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "id",
    },
  },
});

LabResult.belongsTo(Patient, { foreignKey: "patientId" });
LabResult.belongsTo(Employee, { foreignKey: "doctorId" });

LabResult.sync()
  .then(() => {
    console.log("LabResult model synchronized with the database");
  })
  .catch((error) => {
    console.log("Failed to sync LabResult model:", error);
  });

module.exports = LabResult;
