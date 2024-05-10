const radiologyResultSchema = {
  type: "object",
  properties: {
    result: {
      type: "array",
    },
    notes: {
      type: "string",
    },
    patientId: {
      type: "integer",
    },
    doctorId: {
      type: "integer",
    },
  },
  // required: ["result", "notes", "patientId", "doctorId"],
  additionalProperties: false,
};

module.exports = radiologyResultSchema;
