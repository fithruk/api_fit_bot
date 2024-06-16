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
}

module.exports = StatService;
