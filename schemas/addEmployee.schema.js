const employeeRoles = require("../utils/employeeRoles");
const employeeSpecialization = require("../utils/employeeSpecialization");

const addEmployeeSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      pattern: "^[0-9]{10}$",
    },
    name: {
      type: "string",
      minLength: 2,
    },
    email: {
      type: "string",
      format: "email",
    },
    address: {
      type: "string",
      minLength: 1,
    },
    phone: {
      type: "string",
      pattern: "^01[0-9]{9}$",
    },
    password: {
      type: "string",
    },
    specialization: {
      enum: [
        employeeSpecialization.MANAGER,
        employeeSpecialization.RADIOLOGIST,
        employeeSpecialization.DOCTOR,
        employeeSpecialization.NURSE,
        employeeSpecialization.LAB,
        employeeSpecialization.PHARMACY,
        employeeSpecialization.RECEPTIONIST,
      ],
    },
    role: {
      enum: [employeeRoles.ADMIN, employeeRoles.EMPLOYEE],
    },
  },
  required: [
    "id",
    "name",
    "email",
    "address",
    "phone",
    "password",
    "specialization",
    "role",
  ],
  additionalProperties: false,
};

module.exports = addEmployeeSchema;
