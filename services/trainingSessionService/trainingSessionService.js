const trainingSessionSchema = require("../../models/trainingSessionModel");
const exerciseSchema = require("../../models/exerciseModel");

class TrainingSessionService {
  constructor() {}

  async createNewTrainingSession(userName) {
    try {
      const candidate = await trainingSessionSchema.findOne({
        userName,
        isFinished: false,
      });

      if (candidate && !candidate.isFinished) {
        return { status: "exist" };
      }

      const newSession = new trainingSessionSchema({ userName });
      await newSession.save();
      return { status: "succes" };
    } catch (error) {
      console.log("Ошибка во время создания новой тренировки");
      console.log(error.message);
      return { status: "error" };
    }
  }

  async closeCurrentTrainingSession(userName) {
    try {
      const candidate = await trainingSessionSchema.findOne({
        userName,
        isFinished: false,
      });
      if (candidate) {
        candidate.isFinished = true;
        await candidate.save();
        return { status: "closed" };
      }
      return { status: "error" };
    } catch (error) {
      console.log("Ошибка во время завершения тренировки");
      console.log(error.message);
      return { status: "error" };
    }
  }

  async updateTrainingPerfomance(userName, exercise, countOfReps) {
    try {
      const candidate = await trainingSessionSchema.findOne({
        userName,
        isFinished: false,
      });

      const isCurentExercise = candidate.exercises.some(
        (ex) => ex.exercise == exercise
      );

      if (candidate && !isCurentExercise) {
        const newSet = {
          exercise: exercise,
          numberOfSet: 1,
          countOfReps: countOfReps,
        };

        candidate.exercises.push(newSet);
        await candidate.save();
        return { status: "Succes" };
      }

      if (isCurentExercise) {
        const howManySetsThereAre = candidate.exercises.filter(
          (ex) => ex.exercise == exercise
        ).length;

        const newSet = {
          exercise: exercise,
          numberOfSet: howManySetsThereAre + 1,
          countOfReps: countOfReps,
        };

        candidate.exercises.push(newSet);
        await candidate.save();
        return { status: "current" };
      }
    } catch (error) {
      console.log("Ошибка во время обновления упражнения");
      console.log(error.message);
      return { status: "error" };
    }
  }
}

const newTrainingSession = new TrainingSessionService();
module.exports = { newTrainingSession };
