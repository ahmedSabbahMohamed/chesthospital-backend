const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (
      !roles.includes(req.currentUser.role && req.currentUser.specialization)
    ) {
      const error = appError.create(
        "You are not authorized to perform this action",
        403,
        httpStatusText.FAIL
      );
      return next(error);
    }
    return next();
  };
};
