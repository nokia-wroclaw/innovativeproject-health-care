import React from "react";
import { connect } from "react-redux";
import { Table, Icon } from "semantic-ui-react";

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
    <Table definition unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {questions.map(question => (
            <Table.HeaderCell key={question.id} textAlign="center">
              {question.value}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {teams.map((team, i) => (
          <Table.Row key={team.id}>
            <Table.Cell>{team.name}</Table.Cell>

            {questions.map((question, j) => (
              <Table.Cell key={question.id} textAlign="center">
                {getIcon(matrix[i][j], trends[i][j])}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const mapStateToProps = state => ({
  matrix: state.results.tribeMatrix.matrix || [],
  questions: state.results.tribeMatrix.questions || [],
  teams: state.results.tribeMatrix.teams || [],
  trends: state.results.tribeMatrix.trends || []
});

export default connect(mapStateToProps)(Matrix);
