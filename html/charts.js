const ctx = document.getElementById("myChart");
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1", // Changed label to differentiate
      data: [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
      cubicInterpolationMode: "monotone",
    },
    {
      label: "Dataset 2", // Changed label to differentiate
      data: [0, 20, 200, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170],
      fill: false,
      borderColor: "rgb(255, 0, 0)",
      tension: 0.1,
      cubicInterpolationMode: "monotone",
    },
  ],
};
new Chart(ctx, {
  type: "line",
  data: data,
  options: {
    scales: {
      y: {},
      y2: {
        position: "none",
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  },
});