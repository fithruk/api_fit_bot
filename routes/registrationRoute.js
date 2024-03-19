const { Router } = require("express");
const registrationService = require("../services/registrationService/registrationService");

const router = Router();

router.get("/", (req, res) => {
  res.send("Jopa");
});
// Доделать функционал регистрации и проверки существующего юзера в базе
router.post("/", async (req, res) => {
  const { userName, firstName, lastName, userTall, registrationDate } =
    req.body;
  const candidat = await registrationService.findOrCreateUser(userName);
  res.json({ userName, firstName, lastName, userTall, registrationDate });
});

module.exports = router;
