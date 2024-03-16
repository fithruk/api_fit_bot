const { Router } = require("express");
const {
  newTrainingSession,
} = require("../services/trainingSessionService/trainingSessionService");

const router = Router();

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
  const { username, dateOfStart } = req.body;
  await newTrainingSession.getAllExercisesOfTimePeriod(username, dateOfStart);
  res.send("jopa");
});

module.exports = router;
