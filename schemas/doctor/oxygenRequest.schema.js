const OxygenRequestSchema = {
  type: "object",
  properties: {
    patientId: {
      type: "integer",
    },
    doctorId: {
      type: "integer",
    },
    oxygenLevel: {
      type: "integer",
    },
  },
  required: ["patientId", "doctorId", "oxygenLevel"],
  additionalProperties: false,
};

module.exports = OxygenRequestSchema;
