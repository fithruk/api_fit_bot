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

    const averageDifferenceInMinutes = Math.floor(averageDifference / 60000);
    const averageDifferenceInSeconds = Math.floor(
      (averageDifference % 60000) / 1000
    );

    return { averageDifferenceInMinutes, averageDifferenceInSeconds };
  };
}

module.exports = StatService;
