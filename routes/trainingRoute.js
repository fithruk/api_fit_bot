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

  const { status } = await newTrainingSession.closeCurrentTrainingSession(
    userName
  );

  if (status === 200) {
    res.status(200).send("Тренировка успешно завершена.");
  } else {
    res.status(500).send("Somethink went wrong...");
  }
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

router.patch("/removeSet", async (req, res) => {
  const { userName, id } = req.body;
  const { status } = await newTrainingSession.removeSet(userName, id);
  console.log(status);
  res.json({ status });
});

module.exports = router;
