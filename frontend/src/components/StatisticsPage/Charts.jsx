import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";

const chartColors = [
  "red",
  "orange",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "grey",
  "black",
  "yellow"
];

const intToColor = i => {
  return chartColors[i % chartColors.length];
};

const matrixToPercent = (matrix, max) => {
  return matrix.map(row => {
    return row.map(v => {
      return v !== null ? Math.round((v / max) * 100) : null;
    });
  });
};

const matrixColAverage = matrix => {
  let averages = [];
  if (matrix.length < 1) return averages;
  for (let i = 0; i < matrix[0].length; i++) {
    let sum = 0;
    let num = 0;
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[j][i] !== null) {
        sum += matrix[j][i];
        num++;
      }
    }
    averages[i] = Math.round(sum / num);
  }
  return averages;
};

const chartOptions = {
  elements: {
    line: {
      fill: false,
      tension: 0,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 5
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
          max: 100
        }
      }
    ]
  },
  legend: {
    display: true,
    position: "top"
  }
};

const Charts = ({ matrix, periods, teams }) => {
  matrix = matrixToPercent(matrix, 2);

  let allTeamsData = {
    labels: periods.map(p => p.date_start),
    datasets: teams.map((team, i) => ({
      label: team.name,
      data: matrix[i],
      borderColor: intToColor(i),
      pointBackgroundColor: intToColor(i)
    }))
  };

  let averageData = {
    labels: allTeamsData.labels,
    datasets: [
      {
        data: matrixColAverage(matrix),
        borderColor: "blue",
        pointBackgroundColor: "blue"
      }
    ]
  };

  return (
    <React.Fragment>
      <Header as="h2">Overall tribe health</Header>
      <Line
        data={averageData}
        options={{ ...chartOptions, legend: { display: false } }}
        height={100}
      />
      <Header as="h2">Teams</Header>
      <div style={{ minHeight: "50vh" }}>
        <Line
          data={allTeamsData}
          options={{ ...chartOptions, maintainAspectRatio: false }}
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  matrix: state.results.tribeHistory.matrix,
  periods: state.results.tribeHistory.periods,
  teams: state.results.tribeHistory.teams
});

export default connect(mapStateToProps)(Charts);
