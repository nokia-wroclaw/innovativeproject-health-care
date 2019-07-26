import React from "react";
import { connect } from "react-redux";
import { Table, Icon, Container, Sticky } from "semantic-ui-react";
import {ScrollSync, ScrollSyncPane} from "react-scroll-sync";
import './matrix.css';

const RED = "red";
const YELLOW = "yellow";
const GREEN = "green";
const GREY = "grey";

const valueToColor = value => {
  switch (value) {
    case 0:
      return RED;
    case 1:
      return YELLOW;
    case 2:
      return GREEN;
    default:
      return GREY;
  }
};

const getIcon = (value, trend) => {
  const color = valueToColor(value);
  switch (trend) {
    case -1:
      return <Icon name="arrow circle down" color={color} size="large" />;
    case 0:
      return <Icon name="arrow circle right" color={color} size="large" />;
    case 1:
      return <Icon name="arrow circle up" color={color} size="large" />;
    default:
      if (color === GREY)
        return <Icon name="circle outline" color={color} size="large" />;
      else return <Icon name="circle" color={color} size="large" />;
  }
};

const Matrix = ({ matrix, questions, teams, trends }) => {
  return (
  <ScrollSync>
      <table style={{ width: 1100, borderCollapse: 'collapse' }}>

        <ScrollSyncPane group="horizontal">
          <thead className="matrixHeader">
            <tr>
            <th className=" cell cornerCell"/>
            {questions.map(question => (
              <th key={question.id} className="headerCell cell">
                <span className="headerSpan">
                  {question.subject}

                </span>
              </th>
            ))}
            </tr>
          </thead>
        </ScrollSyncPane>

        <ScrollSyncPane group={["horizontal", "vertical"]}>
          <tbody className="matrixBody">
            {teams.map((team, i) => (
              <tr key={team.id}>
                <td className="cell firstColumn">{team.name}</td>
                {questions.map((question, j) => (
                  <td key={question.id} className="cell">
                    {getIcon(matrix[i][j], trends[i][j])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </ScrollSyncPane>

      </table>
  </ScrollSync>
);
};

const mapStateToProps = state => ({
  matrix: state.results.tribeMatrix.matrix || [],
  questions: state.results.tribeMatrix.questions || [],
  teams: state.results.tribeMatrix.teams || [],
  trends: state.results.tribeMatrix.trends || []
});

export default connect(mapStateToProps)(Matrix);
