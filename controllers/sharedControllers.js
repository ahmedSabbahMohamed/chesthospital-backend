const MedicineRequest = require("../models/doctor/medicineRequest.model");
const Medicine = require("../models/pharmacist/medicine.model");
const LabRequest = require("../models/doctor/labRequest.model");
const asyncWrapper = require("../middlewares/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const Patient = require("../models/patient.model");
const RadiologyResult = require("../models/radiologist/radiologyResult.model");
const LabResult = require("../models/lab/labResult.model");
const Report = require("../models/doctor/diagnose.model")
const appError = require("../utils/appError");
const RadiologyRequests = require("../models/doctor/radiologyRequest.model");

const medicineRequests = asyncWrapper(async (req, res, next) => {
  const requests = await MedicineRequest.findAll();
  return res.json({ status: httpStatusText.SUCCESS, data: requests });
});

const labRequests = asyncWrapper(async (req, res, next) => {
  const requests = await LabRequest.findAll();
  return res.json({
    status: httpStatusText.SUCCESS,
    data: { requests },
  });
});

const deleteMedicineRequest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const request = await MedicineRequest.destroy({ where: { id } });
  if (!request) {
    return res
      .status(404)
      .json({ status: httpStatusText.ERROR, message: "not found request" });
  }
  return res.json({ status: httpStatusText.SUCCESS, data: null });
});

const deleteLabRequest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await LabRequest.destroy({
    where: {
      id: id,
    },
  });
  if (!task) {
    const error = appError.create("not found task", 404, httpStatusText.ERROR);
    return next(error);
  }
  return res.json({
    status: httpStatusText.SUCCESS,
    data: null,
    message: "task delted successfully",
  });
});

const radiologyRequests = asyncWrapper(async (req, res, next) => {
  const radiologyRequests = await RadiologyRequests.findAll();
  return res.json({
    status: httpStatusText.SUCCESS,
    data: { radiologyRequests },
  });
});

const deleteRadiologyRequest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await RadiologyRequests.destroy({
    where: {
      id: id,
    },
  });
  if (!task) {
    const error = appError.create("not found task", 404, httpStatusText.ERROR);
    return next(error);
  }
  return res.json({
    status: httpStatusText.SUCCESS,
    data: null,
    message: "task delted successfully",
  });
});

const getMedicineList = asyncWrapper(async (req, res, next) => {
  const medicines = await Medicine.findAll();
  return res.json({ status: httpStatusText.SUCCESS, data: medicines });
});

const getPatient = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const patient = await Patient.findOne({
    where: { id: id },
  });
  const reports = await Report.findAll({
    where: { patientId: id },
  });
  const radiologies = await RadiologyResult.findAll({
    where: {
      patientId: id,
    },
  });
  const labs = await LabResult.findAll({
    where: {
      patientId: id,
    },
  });
  if (!patient) {
    const error = appError.create(
      "patient not found",
      404,
      httpStatusText.ERROR
    );
    return next(error);
  }
  res.json({
    status: httpStatusText.SUCCESS,
    data: { patient, reports, radiologies, labs },
  });
});

module.exports = {
  medicineRequests,
  labRequests,
  deleteMedicineRequest,
  deleteLabRequest,
  radiologyRequests,
  deleteRadiologyRequest,
  getMedicineList,
  getPatient,
};
