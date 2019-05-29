import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Dropdown } from "semantic-ui-react";
import { setUserTribesDetails } from "../../store/actions/user";
import { setTribeMatrix, setTribePeriods } from "../../store/actions/results";
import Loader from "../common/Loader";
import TemplatePage from "../common/TemplatePage/";
import Matrix from "./Matrix";
import Statistic from "./Statistic";

const ResultsMatrixPage = ({ user, tribes, periods, ...props }) => {
  const [currentTribeId, setCurrentTribeId] = useState(undefined);
  const [currentPeriodId, setCurrentPeriodId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    props.setUserTribesDetails(user);
  }, []);

  const handleTribeSelect = (e, { value }) => {
    setIsLoading(true);
    setCurrentTribeId(value);
    props.setTribeMatrix(value).then(() => setIsLoading(false));
    props.setTribePeriods(value);
  };
  const handlePeriodSelect = (e, { value }) => {
    setIsLoading(true);
    setCurrentPeriodId(value);
    props.setTribeMatrix(currentTribeId, value).then(() => setIsLoading(false));
  };

  const getCurrentTribeName = () => {
    try {
      return tribes.find(tribe => tribe.id === currentTribeId).name;
    } catch {
      return null;
    }
  };
  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder="Select tribe"
          options={tribes.map((tribe, i) => ({
            key: i,
            text: tribe.name,
            value: tribe.id
          }))}
          selection
          onChange={handleTribeSelect}
          value={currentTribeId}
        />
        <Dropdown
          placeholder="Select period"
          options={periods.map((period, i) => ({
            key: i,
            text: period.date_start,
            value: period.id
          }))}
          selection
          disabled={!currentTribeId}
          onChange={handlePeriodSelect}
          value={currentPeriodId}
        />

        {isLoading || !currentTribeId ? null : (
          <React.Fragment>
            <Statistic label={getCurrentTribeName()} />
            <br />
            <br />
            <Matrix />
          </React.Fragment>
        )}
        {isLoading ? <Loader active inline="centered" /> : null}
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  tribes: state.user.userData.tribes || [],
  periods: state.results.tribePeriods
});

export default connect(
  mapStateToProps,
  {
    setUserTribesDetails,
    setTribeMatrix,
    setTribePeriods
  }
)(ResultsMatrixPage);
