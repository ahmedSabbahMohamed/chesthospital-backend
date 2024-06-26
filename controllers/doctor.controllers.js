const asyncWrapper = require("../middlewares/asyncWrapper");
const Report = require("../models/doctor/diagnose.model");
const Medicine = require("../models/pharmacist/medicine.model");
const RadiologyRequest = require("../models/doctor/radiologyRequest.model");
const ExitRequest = require("../models/doctor/exitRequest.model");
const Consultation = require("../models/doctor/consultation.model");
const MedicineRequest = require("../models/doctor/medicineRequest.model");
const LabRequest = require("../models/doctor/labRequest.model");
const OxygenRequest = require("../models/doctor/oxygenRequest.model");
// const NursingRequest = require("../models/doctor/nursingRequest.model");
const httppStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const addReport = asyncWrapper(async (req, res, next) => {
  const data = req.body;
  const report = await Report.create(data);
  return res.status(201).json({
    status: httppStatusText.SUCCESS,
    data: { report },
  });
});

const radiologyRequest = asyncWrapper(async (req, res, next) => {
  const data = req.body;
  const radiology = await RadiologyRequest.create(data);
  return res.status(201).json({
    status: httppStatusText.SUCCESS,
    data: { radiology },
  });
});

const getMedicine = asyncWrapper(async (req, res, next) => {
  const medicine = await Medicine.findAll();
  return res.json({ status: httppStatusText.SUCCESS, data: medicine });
});

const exitRequest = asyncWrapper(async (req, res, next) => {
  const data = req.body;
  const requestIsExist = await ExitRequest.findOne({
    where: {
      patientId: data.patientId,
    },
  });
  if (requestIsExist) {
    const error = appError.create(
      "this patient already in exit request list",
      400,
      httppStatusText.ERROR
    );
    return next(error);
  }
  const request = await ExitRequest.create(data);
  return res.status(201).json({
    status: httppStatusText.SUCCESS,
    data: { request },
  });
});

const consultationRequest = asyncWrapper(async (req, res, next) => {
  const data = req.body;
  const consultation = await Consultation.create(data);
  return res.status(201).json({
    status: httppStatusText.SUCCESS,
    data: { consultation },
  });
});

const requestMedicine = asyncWrapper(async (req, res, next) => {
  const data = req.body;
  const medicine = await MedicineRequest.create(data);
  return res
    .status(201)
    .json({ status: httppStatusText.SUCCESS, data: { medicine } });
});

const labRequest = asyncWrapper(async (req, res, next) => {
  const data = req.body;
  const request = await LabRequest.create(data);
  return res
    .status(201)
    .json({ status: httppStatusText.SUCCESS, data: { request } });
});

const oxygenRequest = asyncWrapper(async (req, res, next) => {
  const data = req.body;
  const request = await OxygenRequest.create(data);
  return res
    .status(201)
    .json({ status: httppStatusText.SUCCESS, data: { request } });
});

// const nursingRequest = asyncWrapper(async (req, res, next) => {
//   const data = req.body;
//   const request = await NursingRequest.create(data);
//   return res.status(201).json({
//     status: httppStatusText.SUCCESS,
//     data: { request },
//   });
// });

module.exports = {
  addReport,
  radiologyRequest,
  exitRequest,
  consultationRequest,
  requestMedicine,
  labRequest,
  oxygenRequest,
  getMedicine,
  // nursingRequest,
};
