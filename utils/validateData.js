const appError = require("./appError");
const httpStatusText = require("./httpStatusText")

const validateData = (schema, req, res, next) => {
  const valid = schema(req.body);
  if (!valid) {
    const error = appError.create(schema.errors[0], 400, httpStatusText.ERROR);
    return next(error);
  }
  next();
};

module.exports = validateData;
