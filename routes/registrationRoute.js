const { Router } = require("express");
const apiResponce = require("../apiRespStatuses/apiRespStatuses");
const {
  registrationMiddleware,
} = require("../middleWares/vallidateUserRegistrationData/registrationMiddleware");
const registrationService = require("../services/registrationService/registrationService");

const router = Router();

router.get("/", (req, res) => {
  res.send("Jopa");
});

router.post("/getUser", async (req, res) => {
  const { userName } = req.body;

  try {
    const resp = await registrationService.findUSer(userName);
    if (resp._id) return res.status(200).json({ isExist: true, id: resp._id });
    res.json({ isExist: false });
  } catch (error) {
    console.log(error.message);
    console.log("error in router.post(/getUser");
  }
});

router.post("/createNewUser", registrationMiddleware, async (req, res) => {
  try {
    const resp = await registrationService.createNewUser(req.body);

    res.status(200).json(resp);
  } catch (error) {
    console.log(error.message);
    console.log("error in router.post(/createNewUser");
  }
});

module.exports = router;
