const apiResponceObj = require("../../apiRespStatuses/apiRespStatuses");

const registrationMiddleware = (req, res, next) => {
  const { userName, firstName, lastName, userTall } = req.body;
  if (userName) {
    return next();
  }
  if (
    typeof userName !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof userTall !== "number"
  ) {
    return res.json(apiResponceObj.errorDuringValidationOfNewUser);
  }
  next();
};

module.exports = { registrationMiddleware };
