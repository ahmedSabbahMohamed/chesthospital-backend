const medicineRequestSchema = {
  type: "object",
  properties: {
    patientId: {
      type: "integer",
      pattern: "^[0-9]{10}$",
    },
    doctorId: {
      type: "integer",
      pattern: "^[0-9]{10}$",
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
