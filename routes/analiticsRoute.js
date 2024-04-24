const { Router } = require("express");
const {
  newTrainingSession,
} = require("../services/trainingSessionService/trainingSessionService");

const router = Router();

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
  const { userName, dateOfStart, dateOfFinish } = req.body;
  const exercisesServedByName =
    await newTrainingSession.getAllExercisesOfTimePeriod(
      userName,
      dateOfStart,
      dateOfFinish
    );
  res.send(exercisesServedByName);
});

module.exports = router;
