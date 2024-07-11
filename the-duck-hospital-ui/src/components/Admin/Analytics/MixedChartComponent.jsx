import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const MixedChart = (props) => {
  const options = {
    responsive: true,
  };
  const {labels, total, booking, test} = props;

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
        label: "Khám bệnh",
        backgroundColor: "rgb(255, 99, 132)",
        data: booking,
      },
      {
        type: "bar",
        label: "Điều trị",
        backgroundColor: "rgb(75, 192, 192)",
        data: test,
      },
    ],
  };

  return <Chart type="bar" options={options} data={data} />;
};
