const LabResultSchema = {
    type: "object",
    properties: {
        result: {
            type: "string",
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

module.exports = LabResultSchema;
