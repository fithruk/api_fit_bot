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

  if (exerciseData.length === 0) {
    return res.status(204).send();
  }
  const statService = new StatService();
  const preparedExData =
    statService.cutExerciseDataByUserNameAndExName(exerciseData);

  const imgUrl = await statService.loadGraphImg(preparedExData);
  res.status(200).json({ imgUrl });
});

router.post("/statByTonnage", async (req, res) => {
  const { userName } = req.body;
  const statService = new StatService();
  const exerciseData = await statService.getTonnageOfUser(userName);

  if (exerciseData.length === 0) {
    return res.status(204).send();
  }
  const preparedExData = statService.cutTonnageData(exerciseData);

  const imgUrl = await statService.loadTonnageGraghs(preparedExData);
  res.status(200).json({ imgUrl });
});
module.exports = router;
