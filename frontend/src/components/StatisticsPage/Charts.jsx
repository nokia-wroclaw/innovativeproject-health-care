import React from 'react';
import { Line } from 'react-chartjs-2';
import {connect} from 'react-redux';

const chartColors = ['red', 'orange', 'olive', 'green', 'teal', 'blue',
  'violet', 'purple', 'pink', 'brown', 'grey', 'black', 'yellow'];

const chartOptions = {
  elements: {
    line: {
      fill: false
    }
  }
};

const Charts = ({matrix, periods, teams}) => {

  let allTeamsData = {
    labels: periods.map(p => p.date_start),
    datasets: teams.map((team, i) => ({
      label: team.name,
      data: matrix.map(p => p[i]),
      borderColor: chartColors[i % chartColors.length],
    })),
  };

  return (
    <Line data={allTeamsData} options={chartOptions} />
  );

};

const mapStateToProps = state => ({
  matrix: state.results.tribeHistory.matrix,
  periods: state.results.tribeHistory.periods,
  teams: state.results.tribeHistory.teams,
});

export default connect(
  mapStateToProps,
)(Charts);
