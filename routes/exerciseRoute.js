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

router.post("/subGroupe", async (req, res) => {
  const { groupe } = req.body;

  try {
    const subGroupes = await allExerciseService.getSubGroupes(groupe);

    res.setHeader("Content-Type", "application/json");
    res.json(subGroupes);
  } catch (error) {
    console.error("Ошибка при отправке упражнений:", error);
    res.status(500).send("Ошибка при отправке упражнений");
  }
});

router.post("/bySubDirectory", async (req, res) => {
  const { currentGroup, subDirectory } = req.body;

  try {
    const requestedExercises = await allExerciseService.getExersicesBySubGroup(
      currentGroup,
      subDirectory
    );

    res.setHeader("Content-Type", "application/json");
    res.json(requestedExercises);
  } catch (error) {
    console.error("Ошибка при отправке упражнений:", error);
    res.status(500).send("Ошибка при отправке упражнений");
  }
});

router.post("/loadExersiceImage", async (req, res) => {
  const { groupe, subGroupe, exName } = req.body;

  try {
    const requestedExercise = await allExerciseService.loadExersiceImage(
      groupe,
      subGroupe,
      exName
    );

    res.setHeader("Content-Type", "image/gif");
    res.status(200).send(requestedExercise);
  } catch (error) {
    console.error("Ошибка при отправке упражнений:", error);
    res.status(500).send("Ошибка при отправке упражнений");
  }
});

router.post("/loadDescriptionOfExersice", async (req, res) => {
  const { exName } = req.body;

  try {
    const requestedExercise =
      await allExerciseService.loadDescriptionOfExersice(exName);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(requestedExercise);
  } catch (error) {
    console.error("Ошибка при отправке упражнений:", error);
    res.status(500).send("Ошибка при отправке упражнений");
  }
});

module.exports = router;
