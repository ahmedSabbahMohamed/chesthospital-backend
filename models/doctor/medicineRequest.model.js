const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../../config/db");
const Patient = require("../patient.model");
const Employee = require("../employee.model");

const MedicineRequest = sequelize.define("MedicineRequest", {
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
  medicine: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("medicine");
      return rawValue ? rawValue.split(",").map(Number) : [];
    },
    set(value) {
      this.setDataValue("medicine", value.join(","));
    },
  },
});

MedicineRequest.belongsTo(Patient, { foreignKey: "patientId" });
MedicineRequest.belongsTo(Employee, { foreignKey: "doctorId" });

MedicineRequest.sync()
  .then(() => {
    console.log("MedicineRequest model synchronized with the database");
  })
  .catch((error) => {
    console.error("Failed to sync MedicineRequest model:", error);
  });

module.exports = MedicineRequest;
