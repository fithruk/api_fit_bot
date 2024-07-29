const fs = require("fs/promises");
const path = require("path");
const exerciseModel = require("../../models/exerciseModel");

class AllExerciseService {
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
      res.status(500).send("Ошибка при отправке отдельного упражнения");
    }
  }

  async getExersicesBySubGroup(currentGroup, subDirectory) {
    try {
      const exercisesByGroup = await fs.readdir(
        path.join(__dirname, "../../public/", currentGroup, subDirectory)
      );

      return exercisesByGroup.map((ex) => ex.split(".")[0]);
    } catch (error) {
      console.error("Ошибка при отправке отдельного упражнения:", error);
      res.status(500).send("Ошибка при отправке отдельного упражнения");
    }
  }

  async loadExersiceImage(groupe, subGroupe, exName) {
    const exerciseImage = path.join(
      __dirname,
      "../../public/",
      groupe,
      subGroupe,
      exName
    );

    return exerciseImage;
  }

  async loadDescriptionOfExersice(exName) {
    try {
      const exercise = await exerciseModel.findOne({ name: exName });
      console.log(exName);
      exercise.steps[0].description = exercise.steps[0].description.map(
        (item) => {
          let phase = "Подготовка";
          let instruction = "";
          let message = "";
          for (const i in item.toObject()) {
            if (item.toObject()[i] === ".") {
              instruction += message;
            } else {
              message += item.toObject()[i];
            }
          }
          return { phase, instruction };
        }
      );

      if (exercise.steps[2]) {
        exercise.steps[2].description = exercise.steps[2].description.map(
          (item) => {
            let phase = "Обратите внимание";
            let instruction = "";
            let message = "";
            for (const i in item.toObject()) {
              if (item.toObject()[i] === ".") {
                instruction += message;
              } else {
                message += item.toObject()[i];
              }
            }
            return { phase, instruction };
          }
        );
      }

      return exercise;
    } catch (error) {
      console.log(error.message);
    }
  }
}

const allExerciseService = new AllExerciseService();

module.exports = { allExerciseService };
