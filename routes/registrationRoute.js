const { Router } = require("express");
const registrationService = require("../services/registrationService/registrationService");

const router = Router();

router.get("/", (req, res) => {
  res.send("Jopa");
});

router.post("/", async (req, res) => {
  const candidat = await registrationService.findOrCreateUser(req.body);
  if (candidat) return res.json(candidat._id.toString());

  res.json({ ...req.body });
});

module.exports = router;
