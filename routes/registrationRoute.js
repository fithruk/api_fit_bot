const { Router } = require("express");
const registrationService = require("../services/registrationService/registrationService");

const router = Router();

router.get("/", (req, res) => {
  res.send("Jopa");
});

router.post("/", async (req, res) => {
  const responseOrCandidate = await registrationService.findOrCreateUser(
    req.body
  );
  if (typeof responseOrCandidate == "string")
    return res.json(responseOrCandidate);
  else {
    return res.json(responseOrCandidate._id);
  }
});

module.exports = router;
