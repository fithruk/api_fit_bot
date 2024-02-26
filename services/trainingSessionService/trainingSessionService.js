const trainingSessionSchema = require("../../models/trainingSessionModel");
const exerciseSchema = require("../../models/exerciseModel");

class TrainingSessionService {
  constructor() {}

  async getCurrentTreiningSession(userName) {
    try {
      const candidate = await trainingSessionSchema.findOne({
        userName,
        isFinished: false,
      });

      return candidate && candidate;
    } catch (error) {
      console.log("Ошибка при получении текущей тренировочной сессии");
      console.log(error.message);
    }
  }

  async createNewTrainingSession(userName) {
    try {
      const candidate = await this.getCurrentTreiningSession(userName);

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

  async isTrainingExist(userName) {
    try {
      const candidate = await this.getCurrentTreiningSession(userName);

      if (!candidate) {
        return false;
      }
      return true;
    } catch (error) {
      console.log("Ошибка во время проверки тренировки");
      console.log(error.message);
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

  async updateTrainingPerfomance(userName, exercise, countOfReps, weight) {
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
          exercise,
          numberOfSet: 1,
          countOfReps,
          weight,
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
          exercise,
          numberOfSet: howManySetsThereAre + 1,
          countOfReps,
          weight,
        };

        candidate.exercises.push(newSet);
        await candidate.save();
        return {
          status: "current",
          currentEcercise: candidate.exercises[candidate.exercises.length - 1],
        };
      }
    } catch (error) {
      console.log("Ошибка во время обновления упражнения");
      console.log(error.message);
      return { status: "error" };
    }
  }

  async removeSet(userName, id) {
    //Here, map numbers of set
    console.log(id);
    try {
      const candidate = await this.getCurrentTreiningSession(userName);
      const newExercises = candidate.exercises.filter(
        (ex) => ex._id.toString() != id.toString()
      );

      candidate.exercises = [...newExercises];
      await candidate.save();
      return { status: "Succes" };
    } catch (error) {
      return { status: "Error" };
    }
  }
}

const newTrainingSession = new TrainingSessionService();
module.exports = { newTrainingSession };
