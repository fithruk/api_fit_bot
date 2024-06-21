const { Router } = require("express");
const {
  newTrainingSession,
} = require("../services/trainingSessionService/trainingSessionService");
const StatService = require("../services/statService/statService");
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

router.get("/absRecords", async (req, res) => {
  const { userName } = req.query;
  const result = await newTrainingSession.getAbsRecords(userName);
  res.status(200).json(result);
});

router.post("/workoutByPeriod", async (req, res) => {
  const { userName, dateStart, dateEnd } = req.body;
  let result = await newTrainingSession.getWorkoutByPeriod(
    userName,
    dateStart,
    dateEnd
  );
  result = result
    .filter(
      (item) =>
        new Date(item.dateOfStart) >= new Date(dateStart) &&
        new Date(item.dateOfStart) <= new Date(dateEnd)
    )
    .map((item) => ({
      dateOfStart: item.dateOfStart,
      exercises: item.exercises,
    }));

  res.status(200).json(result);
});

router.post("/statByExersice", async (req, res) => {
  const { userName, exersiceSring } = req.body;
  const exerciseData = await newTrainingSession.findExercisesByUserAndExName(
    userName,
    exersiceSring
  );
  new StatService().prepareExerciseDataByUserNameAndExName(exerciseData);

  res.status(200).send("jopa");
});
module.exports = router;
