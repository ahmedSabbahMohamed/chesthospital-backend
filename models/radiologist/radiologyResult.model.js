const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Patient = require("../../models/patient.model");
const Employee = require("../../models/employee.model");

const RadiologyResult = sequelize.define("RadiologyResult", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  notes: {
    type: DataTypes.STRING,
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

RadiologyResult.belongsTo(Patient, { foreignKey: "patientId" });
RadiologyResult.belongsTo(Employee, { foreignKey: "doctorId" });

RadiologyResult.sync()
  .then(() => {
    console.log("RadiologyResult model synchronized with the database");
  })
  .catch((error) => {
    console.log("Failed to sync RadiologyResult model:", error);
  });

module.exports = RadiologyResult;
