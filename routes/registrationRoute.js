const { Router } = require("express");
const apiResponseObj = require("../apiRespStatuses/apiRespStatuses");
const registrationService = require("../services/registrationService/registrationService");

const router = Router();

router.get("/", (req, res) => {
  res.send("Jopa");
});

router.post("/", async (req, res) => {
  const response = await registrationService.findOrCreateUser(req.body);
  if (typeof response == "string") return res.json(response);
  else {
    return res.json(response._id);
  }

  //res.json(apiResponseObj.userAlreadyExist);
});

module.exports = router;
