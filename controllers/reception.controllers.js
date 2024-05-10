const Patient = require("../models/patient.model")
const asyncWrapper = require("../middlewares/asyncWrapper");
const httppStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const addPatient = asyncWrapper( async(req, res) => {
  const newPatient = await Patient.create(req.body);
  return res.status(201).json({status: httppStatusText.SUCCESS, data: {newPatient}})
});

const getPatient = asyncWrapper( async (req, res, next) => {
  const patientId = req.params.patientId
  const patient = await Patient.findByPk(patientId)
  if(!patient) {
    const error = appError.create("Patient not found", 404, httppStatusText.ERROR)
    return next(error)
  }
  return res.status(200).json({status: httppStatusText.SUCCESS, data: {patient}})
});

// add controller for updating patient
const updatePatient = asyncWrapper(async (req, res, next) => {

});

module.exports = {
    addPatient,
    getPatient,
}
