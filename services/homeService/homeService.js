const fs = require("fs/promises");
const path = require("path");
const exerciseModel = require("../../models/exerciseModel");

class AllExerciseService {
  async getAllExercises(res, subDirectory) {
    try {
      const exercisesArray = await fs.readdir(
        path.join(__dirname, "../../public/", `${subDirectory}`)
      );

      res.setHeader("Content-Type", "application/json");
      res.json(exercisesArray.map((str) => str.split(".")[0]));
    } catch (error) {
      console.error("Ошибка при отправке изображения:", error);
      res.status(500).send("Ошибка при отправке изображения");
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

  async getAppartExercise(exerciseName) {
    try {
      const targetExercise = await exerciseModel.find({ exerciseName });
      return targetExercise;
    } catch (error) {}
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
