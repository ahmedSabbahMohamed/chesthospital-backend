const radiologyResultSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
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
