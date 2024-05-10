const taskSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
    description: {
      type: "string",
      minLength: 1,
    },
    deadline: {
      type: "string",
      format: "date-time",
    },
    doctorId: {
      type: "integer",
    },
    patientId: {
      type: "integer",
    }
  },
  required: ["name", "description", "deadline", "doctorId", "patientId"],
  additionalProperties: false,
};

module.exports = taskSchema;
