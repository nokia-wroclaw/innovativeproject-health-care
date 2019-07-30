import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
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

const TableRow = ({team, row, questions, matrix, trends}) => {
  const [hovered, setHovered] = useState(false);
  const highlightOn = useCallback((e) => {
    setHovered(true);
  })
  const highlightOff = useCallback((e) => {
    setHovered(false);
  })

  return(
    <tr onMouseEnter={highlightOn} onMouseLeave={highlightOff}>
      <td className={"cell firstColumn " + (hovered ? "hoveredHeader" : "")}>
        {team.name}
      </td>
      {questions.map((question, j) => (
        <td key={question.id} className={"cell " + (hovered ? "hoveredCell" : "")}>
          {getIcon(matrix[row][j], trends[row][j])}
        </td>
      ))}
    </tr>
  )
}

const mapStateToProps = state => ({
  matrix: state.results.tribeMatrix.matrix || [],
  questions: state.results.tribeMatrix.questions || [],
  trends: state.results.tribeMatrix.trends || []
});

export default connect(mapStateToProps)(TableRow);