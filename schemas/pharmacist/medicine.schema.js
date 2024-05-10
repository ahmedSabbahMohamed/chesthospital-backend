const medicineSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 200,
    },
  },
  required: ["name"],
  additionalProperties: false,
};

module.exports = medicineSchema;
