const trainingSessionSchema = require("../../models/trainingSessionModel");
const programIdsStorage = require("../../models/programWorkoutsIdsModel");
const StatService = require("../../services/statService/statService");

class TrainingSessionService {
  constructor() {}

  resetTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };
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

  async getAllExercisesOfTimePeriod(userName, dateStart, dateEnd) {
    try {
      const candidateExArrayInPeriod = await trainingSessionSchema.find({
        userName,
        isFinished: true,
        dateOfStart: {
          $gte: new Date(dateStart).setHours(0, 0, 0, 0),
          $lte: new Date(dateEnd).setHours(23, 59, 59, 999),
        },
      });

      let uniqueExercises = new Set();

      candidateExArrayInPeriod.forEach((item) => {
        item.exercises.forEach((ex) => uniqueExercises.add(ex.exercise));
      });

      uniqueExercises = [...uniqueExercises].reduce(
        (acc, ex) => ({ ...acc, [ex]: [] }),
        {}
      );

      candidateExArrayInPeriod.forEach(
        ({ userName, dateOfStart, exercises }) => {
          exercises.forEach((ex) => {
            if (uniqueExercises[ex.exercise]) {
              uniqueExercises[ex.exercise].push({
                ...ex.toObject(),
                userName,
                dateOfStart,
              });
            }
          });
        }
      );

      return uniqueExercises;
    } catch (error) {
      console.log("Ошибка при получении тренировок в период");
      console.log(error.message);
    }
  }

  async createNewTrainingSession(userName) {
    try {
      const candidate = await this.getCurrentTreiningSession(userName);

      if (
        candidate &&
        this.resetTime(candidate.dateOfStart) < this.resetTime(new Date())
      ) {
        this.closeCurrentTrainingSession(userName, true);
        candidate.isFinished = true;
      }
      if (candidate && !candidate.isFinished) {
        return { status: "exist" };
      }

      const newSession = new trainingSessionSchema({ userName });
      //await newSession.save();
      return { status: "succes", workoutId: newSession._id };
    } catch (error) {
      console.log("Ошибка во время создания новой тренировки");
      console.log(error.message);
      console.log(error);
      return { status: "error" };
    }
  }

  // Here...
  async createNewTrainingSessionWithProgram(userName) {
    try {
      const { status, workoutId } = await this.createNewTrainingSession(
        userName
      );
      const newProgramIdsStorage = new programIdsStorage({
        userName,
        workoutId,
      });
      console.log(workoutId + " workoutId");
      await newProgramIdsStorage.save();
      return { status };
    } catch (error) {
      return error.message;
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

  async closeCurrentTrainingSession(userName, isForcedClose = false) {
    const statService = new StatService();
    const endDate = new Date();

    try {
      const candidate = await trainingSessionSchema.findOne({
        userName,
        isFinished: false,
      });
      if (candidate) {
        const {
          averageRestInMinutes,
          averageRestInSeconds,
          durationInHours,
          durationInMinutes,
          tonnage,
          exercisesOfWorkout,
          setsOfWorkout,
        } = statService.prepareWorkoutData(
          candidate.exercises,
          candidate.dateOfStart,
          endDate
        );

        candidate.isFinished = true;
        await candidate.save();
        const workoutResult = {
          userName,
          averageTimeOfRest: { averageRestInMinutes, averageRestInSeconds },
          workoutDuration: { durationInHours, durationInMinutes },
          dateOfStart: candidate.dateOfStart,
          workoutId: candidate._id,
          tonnage,
          exercisesOfWorkout,
          setsOfWorkout,
        };

        await statService.saveWorkoutData(workoutResult);
        console.log(workoutResult);

        if (isForcedClose) {
          return { status: 200 };
        }
        return {
          status: 200,
          averageTimeOfRest: workoutResult.averageTimeOfRest,
          workoutDuration: workoutResult.workoutDuration,
          exercisesOfWorkout,
          setsOfWorkout,
          tonnage,
        };
      }
      return { status: 500 };
    } catch (error) {
      console.log("Ошибка во время завершения тренировки");
      console.log(error.message);
      console.log(error);
      return { status: 500 };
    }
  }

  async updateTrainingPerfomance(
    userName,
    exercise,
    countOfReps,
    weight,
    timeOfStartOfNewSet
  ) {
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
          timeOfStartOfNewSet,
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
          timeOfStartOfNewSet,
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
    try {
      const candidate = await this.getCurrentTreiningSession(userName);
      const exerciseName = candidate.exercises.find(
        (ex) => ex._id.toString() == id.toString()
      ).exercise;

      let newExercises = candidate.exercises.filter(
        (ex) => ex._id.toString() != id.toString()
      );

      let indexes = new Set([]);

      newExercises.forEach((ex, ind) => {
        if (ex.exercise == exerciseName) {
          indexes.add(ind);
        }
      });

      newExercises = newExercises.map((ex, ind) => {
        if (indexes.has(ind)) {
          const indexOfSet = Array.from(indexes).findIndex((el) => el === ind);

          return { ...ex._doc, numberOfSet: indexOfSet + 1 };
        } else {
          return ex;
        }
      });

      candidate.exercises = [...newExercises];
      await candidate.save();
      return { status: "Succes" };
    } catch (error) {
      console.log(error);
      return { status: "Error" };
    }
  }

  async getAbsRecords(userName) {
    try {
      return await trainingSessionSchema.aggregate([
        // Фильтруем сессии по имени пользователя
        { $match: { userName } },
        // Разворачиваем массив exercises на индивидуальные документы
        {
          $addFields: {
            "exercises.dateOfStart": "$dateOfStart", // Добавляем поле из родительского документа
          },
        },
        { $unwind: "$exercises" },
        {
          $group: {
            _id: { exerciseName: "$exercises.exercise" },
            maxWeight: { $max: "$exercises.weight" },
            date: { $first: "$exercises.dateOfStart" },
          },
        },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async getWorkoutByPeriod(userName, dateStart, dateEnd) {
    try {
      return await trainingSessionSchema.find({
        userName: userName,
        dateOfStart: { $gte: dateStart },
        dateOfStart: { $lte: dateEnd },
        isFinished: true,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  findExercisesByUserAndExName = async (userName, exerciseString) => {
    try {
      const exerciseData = await trainingSessionSchema.aggregate([
        { $match: { userName, isFinished: true } }, // Отфильтровываем по имени пользователя и завершенным сессиям
        { $unwind: "$exercises" }, // Разворачиваем массив exercises
        { $match: { "exercises.exercise": exerciseString } }, // Фильтруем по названию упражнения
        {
          $group: {
            _id: "$_id", // Группируем по идентификатору тренировки
            dateOfStart: { $first: "$dateOfStart" }, // Сохраняем дату начала тренировки
            userName: { $first: "$userName" }, // Сохраняем имя пользователя
            maxWeightExercise: {
              $max: {
                exercise: "$exercises.exercise",
                numberOfSet: "$exercises.numberOfSet",
                countOfReps: "$exercises.countOfReps",
                weight: "$exercises.weight",
              },
            }, // Находим упражнение с максимальным весом
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              dateOfStart: "$dateOfStart",
              userName: "$userName",
              exercise: "$maxWeightExercise.exercise",
              numberOfSet: "$maxWeightExercise.numberOfSet",
              countOfReps: "$maxWeightExercise.countOfReps",
              weight: "$maxWeightExercise.weight",
            },
          },
        },
      ]);

      return exerciseData;
    } catch (error) {
      console.error("Ошибка при поиске упражнений:", error.message);
    }
  };

  getAllTonnage = async (username) => {};
}

const newTrainingSession = new TrainingSessionService();
module.exports = { newTrainingSession };
