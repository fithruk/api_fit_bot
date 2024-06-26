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

  prepareWorkoutData = (exersiseArray, dateOfStart, dateOfEnd) => {
    const { averageRestInMinutes, averageRestInSeconds } =
      this.countAvarageTimeOfRestBetweenSets(exersiseArray);
    const { durationInHours, durationInMinutes } = this.countDurationOfWorkout(
      dateOfStart,
      dateOfEnd
    );

    return {
      averageRestInMinutes,
      averageRestInSeconds,
      durationInHours,
      durationInMinutes,
    };
  };

  prepareExerciseDataByUserNameAndExName = (exerciseData) => {
    if (!Array.isArray(exerciseData)) return;
    exerciseData.sort((a, b) => a.dateOfStart - b.dateOfStart);
    if (exerciseData.length > 30) {
      exerciseData = exerciseData.slice(exerciseData.length - 30);
    }

    return exerciseData;
  };

  saveWorkoutData = async (data) => {
    try {
      const newWorkoutData = new StatisticsShema(data);
      await newWorkoutData.save();
    } catch (error) {
      return error;
    }
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
}

module.exports = StatService;
