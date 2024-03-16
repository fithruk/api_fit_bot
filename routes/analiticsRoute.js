const { Router } = require("express");
const {
  newTrainingSession,
} = require("../services/trainingSessionService/trainingSessionService");

const router = Router();

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
  const { userName, dateOfStart } = req.body;
  await newTrainingSession.getAllExercisesOfTimePeriod(userName, dateOfStart);
  res.send("jopa");
});

module.exports = router;
