const axios = require("axios");

class QuickChart {
  constructor(options) {
    this.labels = options.labels;
    this.labelLine = options.labelLine;
    this.labeBar = options.labeBar;
    this.dataForLine = options.dataForLine;
    this.dataForBar = options.dataForBar;
    this.text = options.text;
  }

  generateSchema() {
    return {
      type: "bar",
      data: {
        labels: this.labels, //[]
        datasets: [
          {
            type: "line",
            label: this.labelLine, //string
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 1,
            fill: false,
            data: this.dataForLine, //[]
          },
          {
            type: "bar",
            label: this.labeBar, //string
            borderColor: "rgb(0, 0, 235)",
            borderWidth: 2,
            fill: true,
            data: this.dataForBar, //[]
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: this.text,
        },
      },
    };
  }

  async loadQuickChartImg() {
    const chartConfig = this.generateSchema();
    const url = "https://quickchart.io/chart/create";

    try {
      const response = await axios.post(url, { chart: chartConfig });
      return response.data.url;
    } catch (error) {
      console.error(
        "Ошибка при загрузке изображения QuickChart:",
        error.message
      );
    }
  }
}

module.exports = QuickChart;
