const { Sequelize } = require("sequelize");

const errorHandler = (error, req, res, next) => {
  if (error instanceof Sequelize.UniqueConstraintError) {
    handleUniqueConstraintError(error, res);
  } else {
    handleOtherErrors(error, res);
  }
};

const handleUniqueConstraintError = (error, res) => {
  const validationErrors = error.errors.map((err) => err.message);
  const errorMessage = validationErrors[0];
  sendErrorResponse(res, 400, errorMessage);
};

const handleOtherErrors = (error, res) => {
  const statusCode = error.statusCode || 500;
  const statusText = error.statusText || "Internal Server Error";
  const errorMessage = error.message;
  sendErrorResponse(res, statusCode, errorMessage, statusText);
};

const sendErrorResponse = (res, statusCode, message, statusText = null) => {
  res.status(statusCode).json({
    status: "error",
    message: message,
    code: statusCode,
    data: null,
    ...(statusText && { statusText: statusText }),
  });
};

module.exports = errorHandler;
