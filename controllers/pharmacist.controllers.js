const Medicine = require("../models/pharmacist/medicine.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { Op } = require('sequelize');

const getMedicines = asyncWrapper(async (req, res, next) => {
  const medicine = await Medicine.findAll();
  return res.json({ status: httpStatusText.SUCCESS, data: { medicine } });
});

const addMedicine = asyncWrapper(async (req, res, next) => {
  const data = req.body;
  const medicine = await Medicine.create(data);
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: medicine });
});

const searchMedicine = asyncWrapper(async (req, res, next) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      message: "Query parameter is required",
    });
  }
  const medicines = await Medicine.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${query}%` } },
      ],
    },
  });
  return res.json({ status: httpStatusText.SUCCESS, data: medicines });
});

const deleteMedicine = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const medicine = await Medicine.findByPk(id);
    if (!medicine) {
        return res.status(404).json({ status: httpStatusText.ERROR, message: "not found medicine" });
    }
    await medicine.destroy();
    return res.json({ status: httpStatusText.SUCCESS, data: null})
})

module.exports = {
  getMedicines,
  addMedicine,
  searchMedicine,
  deleteMedicine,
};
