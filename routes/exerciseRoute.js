const { Router } = require("express");
const {
  allExerciseService,
} = require("../services/exerciseService/exerciseService");

const router = Router();

// удалить потом нижестоящий код
router.get("/", async (req, res) => {
  try {
    const requestedGroupe = await allExerciseService.getAllMusclesGroups();

    res.setHeader("Content-Type", "application/json");
    res.json(requestedGroupe);
  } catch (error) {
    console.error("Ошибка при отправке упражнений:", error);
    res.status(500).send("Ошибка при отправке упражнений");
  }
});

router.post("/", async (req, res) => {
  const { groupe } = req.body;

  try {
    const requestedGroupe = await allExerciseService.getAllExercises(groupe);

    res.setHeader("Content-Type", "application/json");
    res.json(requestedGroupe);
  } catch (error) {
    console.error("Ошибка при отправке упражнений:", error);
    res.status(500).send("Ошибка при отправке упражнений");
  }
});

router.post("/apart", async (req, res) => {
  const { exercise, subDirectory } = req.body;

  try {
    const requestedExercise = await allExerciseService.getAppartExerciseFull(
      exercise,
      subDirectory
    );

    res.setHeader("Content-Type", "application/json");
    res.json(requestedExercise);
  } catch (error) {
    console.error("Ошибка при отправке упражнений:", error);
    res.status(500).send("Ошибка при отправке упражнений");
  }
});

module.exports = router;
