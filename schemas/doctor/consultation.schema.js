const consultationSchema = {
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
    doctorId: {
      type: "integer",
    },
    hospital: {
      type: "string",
      minLength: 2,
      maxLength: 255,
    },
    specialization: {
      type: "string",
      minLength: 2,
      maxLength: 255,
    },
  },
  required: ["name", "doctorId", "hospital", "specialization"],
  additionalProperties: false,
};

module.exports = consultationSchema;
