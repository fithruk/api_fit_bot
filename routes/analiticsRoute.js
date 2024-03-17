const { Router } = require("express");
const {
  newTrainingSession,
} = require("../services/trainingSessionService/trainingSessionService");

const router = Router();

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
  const { userName, dateOfStart, dateOfFinish } = req.body;
  await newTrainingSession.getAllExercisesOfTimePeriod(
    userName,
    dateOfStart,
    dateOfFinish
  );
  res.send("jopa");
});

module.exports = router;
