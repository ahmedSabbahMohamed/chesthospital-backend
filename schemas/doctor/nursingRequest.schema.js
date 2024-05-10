const nursingRequestSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
    },
    request: {
      type: "string",
    },
    patientId: {
      type: "integer",
    },
    doctorId: {
      type: "integer",
    },
  },
  required: ["request", "patientId", "doctorId"],
  additionalProperties: false,
};

module.exports = nursingRequestSchema;
