const fs = require("fs/promises");
const path = require("path");
const exerciseModel = require("../../models/exerciseModel");

class AllExerciseService {
  // Here... попробовать сосавить путь из ответов юзера
  async getAllExercises(subDirectory) {
    try {
      const exercisesArray = await fs.readdir(
        path.join(__dirname, "../../public/", `${subDirectory}`)
      );

      return exercisesArray.map((str) => str.split(".")[0]);
    } catch (error) {
      console.error("Ошибка при getAllExercises:", error);
    }
  }

  async getAllMusclesGroups() {
    try {
      const groupesArray = await fs.readdir(
        path.join(__dirname, "../../public/")
      );
      return groupesArray;
    } catch (error) {
      console.error("Ошибка при отправке мышечных групп:", error);
      res.status(500).send("Ошибка при отправке мышечных групп");
    }
  }

  async getSubGroupes(subGroup) {
    try {
      const subGroupesPath = path.join(__dirname, "../../public/", subGroup);

      const subGroupesArray = await fs.readdir(subGroupesPath);

      return subGroupesArray;
    } catch (error) {
      console.error("Ошибка при отправке отдельного упражнения:", error);
      // res.status(500).send("Ошибка при отправке отдельного упражнения");
    }
  }

  async getExersicesBySubGroup(currentGroup, subDirectory) {
    try {
      const exerciseImage = path.join(
        __dirname,
        "../../public/",
        currentGroup,
        subDirectory
      );

      const exercisesByGroup = await fs.readdir(
        path.join(__dirname, "../../public/", currentGroup, subDirectory)
      );

      return exercisesByGroup.map((ex) => ex.split(".")[0]);
    } catch (error) {
      console.error("Ошибка при отправке отдельного упражнения:", error);
      // res.status(500).send("Ошибка при отправке отдельного упражнения");
    }
  }
}

const allExerciseService = new AllExerciseService();

module.exports = { allExerciseService };

// const imagePath = path.join(
//     __dirname,
//     "../../public/",
//     `${subDirectory}`,
//     "бицепс_гантелями_с_супинацией.jpg"
//   );
