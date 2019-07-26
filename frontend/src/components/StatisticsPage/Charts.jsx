import React from "react";
import { Line, Chart } from "react-chartjs-2";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import { random, shuffle} from "lodash";

let clicks = 0;
let timeout;
const delay = 200;

let defaultOnClick = Chart.defaults.global.legend.onClick;

const generateRandomColors = (n) => {
  let colors = []
  const unit = Math.floor(360 / n);
  for(let i=0; i<n; i++) {
    let hue = i * unit;
    let saturation = random(80, 100);
    let lightness = random(30, 60);
    colors.push(`hsla(${hue}, ${saturation}%, ${lightness}%, 1)`);
  }
  return shuffle(colors);;
}

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
    position: "top",
    onClick: function(e, clickedItem) {
        clicks += 1;
        timeout = setTimeout(() => {
          if(clicks === 1) {
            defaultOnClick.call(this.chart, e, clickedItem);
          }
          else {
            clearTimeout(timeout);
            const index = clickedItem.datasetIndex;
            let ci = this.chart;
            const isHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;       
            let anyOthersHidden = false;
            let allOthersHidden = true;
            
            ci.data.datasets.forEach(function(e, i) {
              let meta = ci.getDatasetMeta(i);
              if (i !== index) {
                if (meta.hidden) {
                  anyOthersHidden = true;
                } else {
                  allOthersHidden = false;
                }
              }
            });

            if (isHidden && allOthersHidden) {
              ci.getDatasetMeta(index).hidden = null;
            } else { 
            ci.data.datasets.forEach(function(e, i) {
              let meta = ci.getDatasetMeta(i);

              if (i !== index) {
                if (anyOthersHidden && !allOthersHidden) {
                  meta.hidden = true;
                } else {
                  meta.hidden = meta.hidden === null ? !meta.hidden : null;
                }
              } else {
                meta.hidden = null;
              }
            });
            }
            ci.update();
          }
          clicks = 0;
        }, delay)
      }
    },
};


const Charts = ({ matrix, periods, teams }) => {
  matrix = matrixToPercent(matrix, 2);
  const colorsArray = generateRandomColors(matrix.length);

  let allTeamsData = {
    labels: periods.map(p => p.date_start),
    datasets: teams.map((team, i) => ({
      label: team.name,
      data: matrix[i],
      borderColor: colorsArray[i],
      pointBackgroundColor: colorsArray[i]
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
