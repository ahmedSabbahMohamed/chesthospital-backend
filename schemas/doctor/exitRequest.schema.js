const exitRequestSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
    },
    patientId: {
      type: "integer",
    },
    doctorId: {
      type: "integer",
    },
  },
  required: ["patientId", "doctorId"],
  additionalProperties: false,
};

module.exports = exitRequestSchema;
