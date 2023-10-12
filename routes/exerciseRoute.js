const { Router } = require("express");
const {
  allExerciseService,
} = require("../services/exerciseService/exerciseService");

const router = Router();

// удалить потом нижестоящий код
router.get("/", async (req, res) => {
  const subDirectory = "arms"; // часть пути ,категория группы упражнений, должна приходить из запроса
  try {
    const requestedGroupe = await allExerciseService.getAllExercises(
      subDirectory
    );

    res.setHeader("Content-Type", "application/json");
    res.json(requestedGroupe);
  } catch (error) {
    console.error("Ошибка при отправке упражнений:", error);
    res.status(500).send("Ошибка при отправке упражнений");
  }
});

router.post("/", async (req, res) => {
  const subDirectory = "arms"; // часть пути ,категория группы упражнений, должна приходить из запроса
  try {
    const requestedGroupe = await allExerciseService.getAllExercises(
      subDirectory
    );

    res.setHeader("Content-Type", "application/json");
    res.json(requestedGroupe);
  } catch (error) {
    console.error("Ошибка при отправке упражнений:", error);
    res.status(500).send("Ошибка при отправке упражнений");
  }
});

module.exports = router;
