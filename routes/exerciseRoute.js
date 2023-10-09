const { Router } = require("express");
const { allExerciseService } = require("../services/homeService/homeService");

const router = Router();

router.get("/", (req, res) => {
  const subDirectory = "arms"; // часть пути ,категория группы упражнений, должна приходить из запроса
  allExerciseService.getAllExercises(res, subDirectory);
  allExerciseService.getAppartExercise("бицепс_гантелями_с_супинацией");
});

module.exports = router;
