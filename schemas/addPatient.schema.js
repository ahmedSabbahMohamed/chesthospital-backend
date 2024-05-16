const addPatientSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      pattern: "^[0-9]{14}$",
    },
    name: {
      type: "string",
      minLength: 2,
    },
    phone: {
      type: "string",
      pattern: "^01[0-9]{9}$",
    },
    email: {
      type: "string",
      format: "email",
    },
    dateOfBirth: {
      type: "string",
      format: "date",
    },
    address: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["id", "name", "phone", "email", "dateOfBirth", "address"],
  additionalProperties: false,
};

module.exports = addPatientSchema;
