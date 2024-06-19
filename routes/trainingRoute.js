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

router.post("/getCurrentTrainingSession", async (req, res) => {
  const { userName } = req.body;

  const currentUserSession = await newTrainingSession.getCurrentTreiningSession(
    userName
  );
  res.json({ currentUserSession });
});

router.post("/closeTrainingSession", async (req, res) => {
  const { userName } = req.body;

  const { status, averageTimeOfRest, workoutDuration, exLength } =
    await newTrainingSession.closeCurrentTrainingSession(userName);

  if (status === 200) {
    res.status(200).json({ averageTimeOfRest, workoutDuration, exLength });
  } else {
    res.status(500).send("Somethink went wrong...");
  }
});

router.put("/updateTrainingPerfomance", async (req, res) => {
  const { userName, exercise, countOfReps, weight } = req.body;
  const timeOfStartOfNewSet = new Date();
  const { status } = await newTrainingSession.updateTrainingPerfomance(
    userName,
    exercise,
    countOfReps,
    +weight,
    timeOfStartOfNewSet
  );
  res.json({ status });
});

router.patch("/removeSet", async (req, res) => {
  const { userName, id } = req.body;
  try {
    const { status } = await newTrainingSession.removeSet(userName, id);
    res.status(200).json({ status });
  } catch (error) {
    res.status(500).send("Somethink went wrong...");
  }
});

module.exports = router;
