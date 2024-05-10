const labRequest = {
  type: "object",
  properties: {
    id: {
      type: "integer",
    },
    name: {
      type: "string",
      minLength: 2,
      maxLength: 255,
    },
    description: {
      type: "string",
      minLength: 2,
      maxLength: 255,
    },
    patientId: {
      type: "integer",
    },
    doctorId: {
      type: "integer",
    },
  },
  required: ["name", "patientId", "doctorId", "description"],
  additionalProperties: false,
};

module.exports = labRequest;
