import { Chart as ChartJS, registerables } from "chart.js";
import React from "react";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  // CategoryScale,
  // LinearScale,
  // BarElement,
  // LineElement,
  // PointElement,
  // Title,
  // Tooltip,
  // Legend
  ...registerables
);

export const MixedChart = (props) => {
  const { labels, total, booking, test, isGeneral = true } = props;

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value, index, values) {
            return value.toLocaleString() + "k";
          },
        },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        type: "line",
        label: "Tổng doanh thu",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        data: total,
        tension: 0.3,
      },
      {
        type: "bar",
        label: isGeneral ? "Khám và điều trị" : "Khám bệnh",
        backgroundColor: "rgb(255, 99, 132)",
        data: booking,
      },
      {
        type: "bar",
        label: isGeneral ? "Xét nghiệm" : "Điều trị",
        backgroundColor: "rgb(75, 192, 192)",
        data: test,
      },
    ],
    options: options,
  };

  return <Chart type="bar" options={options} data={data} />;
};
