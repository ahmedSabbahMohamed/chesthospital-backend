const Medicine = require("../models/pharmacist/medicine.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getMedicines = asyncWrapper(async (req, res, next) => {
    const medicine = await Medicine.findAll();
    return res.json({status: httpStatusText.SUCCESS, data: {medicine}})
});

const addMedicine = asyncWrapper(async (req, res, next) => {
    const data = req.body;
    const medicine = await Medicine.create(data);
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: medicine });
});

module.exports = {
    getMedicines,
    addMedicine,
}
