import { Doughnut, Line } from 'react-chartjs-2'
import React from 'react'

const DoughnutChart = props => {
  return <Doughnut data={props.data} />
}

let lineChartOptions = {
  legend: {
    display: false,
  },
  layout: {
    padding: 0,
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: { beginAtZero: true, autoSkip: true, maxTicksLimit: 5 },
      },
    ],
    xAxes: [
      {
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
}

const LineChart = props => {
  return (
    <Line
      data={props.data}
      width={100}
      height={20}
      options={lineChartOptions}
    />
  )
}

export { DoughnutChart, LineChart }
