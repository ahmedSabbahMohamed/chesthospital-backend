const medicineRequestSchema = {
  type: "object",
  properties: {
    patientId: {
      type: "integer",
      pattern: "^[0-9]{14}$",
    },
    doctorId: {
      type: "integer",
      pattern: "^[0-9]{14}$",
    },
    medicine: {
      type: "array",
      items: {
        type: "integer",
      },
    },
  },
  required: ["patientId", "doctorId", "medicine"],
  additionalProperties: false,
};

module.exports = medicineRequestSchema;
