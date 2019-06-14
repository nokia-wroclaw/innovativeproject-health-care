import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Statistic as SemanticStatistic } from "semantic-ui-react";

const getColor = value => {
  if (value < 50) return "red";
  if (value >= 50 && value < 70) return "yellow";
  if (value >= 70) return "green";
};

const countStatistic = matrix => {
  try {
    let oneDimension = _.reduceRight(
      matrix,
      (flattened, other) => flattened.concat(other),
      []
    );
    oneDimension = oneDimension.filter(item => item !== null);
    const sum = oneDimension.reduce((total, num) => total + num);
    const max = oneDimension.length * 2;
    return _.round((sum / max) * 100);
  } catch {
    return null;
  }
};

const Statistic = ({ label, matrix }) => {
  let value = countStatistic(matrix);
  let color = getColor(value);

  return value ? (
    <SemanticStatistic color={color} floated="right" size="small">
      <SemanticStatistic.Value>{value}%</SemanticStatistic.Value>
      <SemanticStatistic.Label>{label}</SemanticStatistic.Label>
    </SemanticStatistic>
  ) : null;
};

const mapStateToProps = state => ({
  matrix: state.results.tribeMatrix.matrix || []
});

export default connect(mapStateToProps)(Statistic);
