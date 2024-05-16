const diagnose = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    patientId: {
      type: "string",
      pattern: "^[0-9]{10}$",
    },
    doctorId: {
      type: "string",
      pattern: "^[0-9]{10}$",
    },
    diagnose: {
      type: "string",
      minLength: 2,
    },
    prescription: {
      type: "string",
      minLength: 2,
    },
  },
  required: ["patientId", "doctorId", "diagnose", "prescription"],
  additionalProperties: false,
};

module.exports = diagnose;
