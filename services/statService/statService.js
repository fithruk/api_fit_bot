const moment = require("moment");
const StatisticsShema = require("../../models/statModel");
const QuickChart = require("../../quickChart/quickChart");

class StatService {
  constructor() {}

  countAvarageTimeOfRestBetweenSets = (exersiseArray) => {
    if (!Array.isArray(exersiseArray))
      return console.log("exersiseArray must be an array");

    const dates = exersiseArray.map(
      (item) => new Date(item.timeOfStartOfNewSet)
    );

    function getDifferenceInMS(date1, date2) {
      return Math.abs(date2 - date1);
    }

    const differences = [];
    for (let i = 1; i < dates.length; i++) {
      differences.push(getDifferenceInMS(dates[i - 1], dates[i]));
    }

    const totalDifference = differences.reduce((acc, curr) => acc + curr, 0);
    const averageDifference = totalDifference / differences.length;

    const averageRestInMinutes = Math.floor(averageDifference / 60000);
    const averageRestInSeconds = Math.floor((averageDifference % 60000) / 1000);

    return { averageRestInMinutes, averageRestInSeconds };
  };

  countDurationOfWorkout = (dateOfStart, dateOfEnd) => {
    dateOfStart = new Date(dateOfStart);
    dateOfEnd = new Date(dateOfEnd);

    const differenceInMs = Math.abs(dateOfEnd - dateOfStart);

    const durationInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const durationInMinutes = Math.floor(
      (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    return { durationInHours, durationInMinutes };
  };

  countWorkoutTonnage = (exersiseArray) => {
    if (!Array.isArray(exersiseArray))
      return console.log("exersiseArray mast be an array!");
    return exersiseArray.reduce(
      (acc, { countOfReps, weight }) => acc + countOfReps * weight,
      0
    );
  };

  prepareWorkoutData = (exerciseArray, dateOfStart, dateOfEnd) => {
    const { averageRestInMinutes, averageRestInSeconds } =
      this.countAvarageTimeOfRestBetweenSets(exerciseArray);
    const { durationInHours, durationInMinutes } = this.countDurationOfWorkout(
      dateOfStart,
      dateOfEnd
    );
    const tonnage = this.countWorkoutTonnage(exerciseArray);
    const { exercisesOfWorkout, setsOfWorkout } =
      this.countExerciseAndSets(exerciseArray);

    return {
      averageRestInMinutes,
      averageRestInSeconds,
      durationInHours,
      durationInMinutes,
      tonnage,
      exercisesOfWorkout,
      setsOfWorkout,
    };
  };

  cutExerciseDataByUserNameAndExName = (exerciseData) => {
    if (!Array.isArray(exerciseData)) return;
    exerciseData.sort((a, b) => a.dateOfStart - b.dateOfStart);
    if (exerciseData.length > 30) {
      exerciseData = exerciseData.slice(exerciseData.length - 30);
    }

    return exerciseData;
  };

  cutTonnageData = (exerciseData) => {
    let stepOfSlice = 25;
    if (!Array.isArray(exerciseData)) return;
    exerciseData = exerciseData.map((item) => {
      if (!Array.isArray(item)) return item;
      if (item.length > 30) {
        item = item.slice(item.length - stepOfSlice);
      }
      return item;
    });
    return exerciseData;
  };

  getTonnageOfUser = async (userName) => {
    try {
      const results = await StatisticsShema.aggregate([
        {
          $match: {
            userName: userName,
          },
        },
        {
          $group: {
            _id: "$userName",
            tonnages: { $push: "$tonnage" },
            workoutDurations: {
              $push: {
                durationInHours: "$workoutDuration.durationInHours",
                durationInMinutes: "$workoutDuration.durationInMinutes",
              },
            },
            exercisesOfWorkout: { $push: "$exercisesOfWorkout" },
            setsOfWorkout: { $push: "$setsOfWorkout" },
          },
        },
      ]);
      return results;
    } catch (error) {
      console.error("Error during aggregation:", error);
    }
  };
  saveWorkoutData = async (data) => {
    try {
      const newWorkoutData = new StatisticsShema(data);
      await newWorkoutData.save();
    } catch (error) {
      return error;
    }
  };

  countExerciseAndSets = (exerciseData) => {
    if (!Array.isArray(exerciseData)) return;
    const exercisesOfWorkout = new Set();
    exerciseData.forEach((ex) => exercisesOfWorkout.add(ex.exercise));

    return {
      exercisesOfWorkout: exercisesOfWorkout.size,
      setsOfWorkout: exerciseData.length,
    };
  };

  loadGraphImg = async (preparedExData) => {
    const options = {
      labels: preparedExData.map((item) =>
        moment(item.dateOfStart).format("'DD/MM/YYYY'")
      ),
      labelLine: "Вес снаряда в рабочем подходе",
      labeBar: "Кол-во повторений",
      dataForLine: preparedExData.map((item) => item.weight),
      dataForBar: preparedExData.map((item) => item.countOfReps),
      text:
        preparedExData.length > 0
          ? preparedExData[0].exercise
          : "Нет данных для этого упражнения",
    };
    const quickChart = new QuickChart(options);
    return await quickChart.loadQuickChartImg();
  };

  loadTonnageGraghs = async (preparedExData) => {
    const { tonnages, workoutDurations, exercisesOfWorkout, setsOfWorkout } =
      preparedExData[0];
    console.log(tonnages);
    const options = {
      labels: tonnages.map((_, ind) => `Тренировка № ${ind + 1}`),
      labelLine: "Тоннаж за тренировку, количество повторений * вес снаряда",
      labelBar: "",
      dataForLine: tonnages,
      dataForBar: [],
      text: "Объем тренировочной нагрузки",
    };

    const quickChart = new QuickChart(options);
    const url = await quickChart.loadQuickChartImg();
    return url;
  };
}

module.exports = StatService;
