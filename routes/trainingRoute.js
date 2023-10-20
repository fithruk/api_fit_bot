const { Router } = require("express");
const {
  newTrainingSession,
} = require("../services/trainingSessionService/trainingSessionService");

const router = Router();

router.get("/", (req, res) => {
  res.send("Trainings");
});

router.post("/", async (req, res) => {
  const { userName } = req.body;
  const { status } = await newTrainingSession.createNewTrainingSession(
    userName
  );
  res.json({ status });
});

router.post("/isTrainingExist", async (req, res) => {
  const { userName } = req.body;

  const status = await newTrainingSession.isTrainingExist(userName);
  res.json({ status });
});

router.put("/closeTrainingSession", async (req, res) => {
  const { userName } = req.body;
  const { status } = await newTrainingSession.closeCurrentTrainingSession(
    userName
  );
  res.json({ status });
});

router.put("/updateTrainingPerfomance", async (req, res) => {
  const { userName, exercise, countOfReps, weight } = req.body;
  const { status } = await newTrainingSession.updateTrainingPerfomance(
    userName,
    exercise,
    countOfReps,
    +weight
  );
  res.json({ status });
});

module.exports = router;
