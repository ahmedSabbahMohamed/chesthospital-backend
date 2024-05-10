const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const validateData = require("../utils/validateData");

const ajv = new Ajv();
addFormats(ajv);

const patient = require("../schemas/addPatient.schema");
const employee = require("../schemas/addEmployee.schema");
const diagnose = require("../schemas/doctor/diagnose.schema");
const radiologyRequest = require("../schemas/doctor/radiologyRequest.schema");
const exitRequest = require("../schemas/doctor/exitRequest.schema");
const consultation = require("../schemas/doctor/consultation.schema");
const medicine = require("../schemas/pharmacist/medicine.schema");
const medicineRequest = require("../schemas/doctor/medicineRequest.schema");
const task = require("../schemas/task.schema");
const labRequest = require("../schemas/doctor/labRequest.schmea");
const oxygenRequest = require("../schemas/doctor/oxygenRequest.schema");
const labResult = require("../schemas/lab/labResult.schema");
const radiologyResult = require("../schemas/radiologist/radiologyResult.schema");
const login = require("../schemas/auth/login.schema");

const validatePatient = ajv.compile(patient);
const validateEmployee = ajv.compile(employee);
const validateDiagnose = ajv.compile(diagnose);
const validateRadiologyRequest = ajv.compile(radiologyRequest);
const validateExitRequest = ajv.compile(exitRequest);
const validateConsultation = ajv.compile(consultation);
const validateMedicine = ajv.compile(medicine);
const validateMedicineRequest = ajv.compile(medicineRequest);
const validateTask = ajv.compile(task);
const validateLabRequest = ajv.compile(labRequest);
const validateOxygenRequest = ajv.compile(oxygenRequest);
const validateLabResult = ajv.compile(labResult);
const validateRadiologyResult = ajv.compile(radiologyResult);
const validateLogin = ajv.compile(login);

const validatePatientData = (req, res, next) => {
  validateData(validatePatient, req, res, next);
};

const validateEmployeeData = (req, res, next) => {
  validateData(validateEmployee, req, res, next);
};

const validateDiagnoseData = (req, res, next) => {
  validateData(validateDiagnose, req, res, next);
};

const validateRadiologyRequestData = (req, res, next) => {
  validateData(validateRadiologyRequest, req, res, next);
};

const validateExitRequestData = (req, res, next) => {
  validateData(validateExitRequest, req, res, next);
};

const validateConsultationData = (req, res, next) => {
  validateData(validateConsultation, req, res, next);
};

const validateMedicineData = (req, res, next) => {
  validateData(validateMedicine, req, res, next);
};

const validateMedicineRequestData = (req, res, next) => {
  validateData(validateMedicineRequest, req, res, next);
};

const validateTaskData = (req, res, next) => {
  validateData(validateTask, req, res, next);
};

const validateLabRequestData = (req, res, next) => {
  validateData(validateLabRequest, req, res, next);
};

const validateOxygenRequestData = (req, res, next) => {
  validateData(validateOxygenRequest, req, res, next);
};

const validateLabResultData = (req, res, next) => {
  validateData(validateLabResult, req, res, next);
};

const validateRadiologyResultData = (req, res, next) => {
  validateData(validateRadiologyResult, req, res, next);
};

const validateLoginData = (req, res, next) => {
  validateData(validateLogin, req, res, next);
};

module.exports = {
  validatePatientData,
  validateEmployeeData,
  validateDiagnoseData,
  validateRadiologyRequestData,
  validateExitRequestData,
  validateConsultationData,
  validateMedicineData,
  validateMedicineRequestData,
  validateTaskData,
  validateLabRequestData,
  validateOxygenRequestData,
  validateLabResultData,
  validateRadiologyResultData,
  validateLoginData,
};
