const LabResultSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
        },
        result: {
            type: "file",
        },
        patientId: {
            type: "integer",
        },
        doctorId: {
            type: "integer",
        },
    },
    // required: ["result", "patientId", "doctorId"],
    additionalProperties: false,
};

module.exports = LabResultSchema;
