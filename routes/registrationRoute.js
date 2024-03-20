const { Router } = require("express");
const apiResponseObj = require("../apiRespStatuses/apiRespStatuses");
const registrationService = require("../services/registrationService/registrationService");

const router = Router();

router.get("/", (req, res) => {
  res.send("Jopa");
});

router.post("/", async (req, res) => {
  const candidat = await registrationService.findOrCreateUser(req.body);
  if (candidat) return res.json(apiResponseObj.userAlreadyExist);

  //res.json(apiResponseObj.userAlreadyExist);
});

module.exports = router;
