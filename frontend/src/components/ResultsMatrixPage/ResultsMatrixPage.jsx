import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Dropdown, Grid } from "semantic-ui-react";
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
    if (tribes[0]) handleTribeSelect(null, { value: tribes[0].id });
  }, [tribes]);

  useEffect(() => {
    if (periods[0]) setCurrentPeriodId(periods[0].id);
  }, [periods]);

  useEffect(() => {
    props.setUserTribesDetails(user);
  }, []);

  const fetchMatrix = (tribeId, periodId = null) => {
    setIsLoading(true);
    props.setTribeMatrix(tribeId, periodId).then(() => setIsLoading(false));
  };

  const handleTribeSelect = (e, { value }) => {
    if (value === currentTribeId) return;
    setCurrentTribeId(value);
    fetchMatrix(value);
    props.setTribePeriods(value);
  };

  const handlePeriodSelect = (e, { value }) => {
    if (value === currentPeriodId) return;
    setCurrentPeriodId(value);
    fetchMatrix(currentTribeId, value);
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
        <Grid stackable padded>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
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
            </Grid.Column>
            <Grid.Column width={6}>
              {isLoading || !currentTribeId ? null : (
                <Statistic label={getCurrentTribeName()} />
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {isLoading || !currentTribeId ? null : <Matrix />}
              {isLoading ? <Loader active inline="centered" /> : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  tribes: state.user.tribes || [],
  periods: state.results.tribePeriods || []
});

export default connect(
  mapStateToProps,
  {
    setUserTribesDetails,
    setTribeMatrix,
    setTribePeriods
  }
)(ResultsMatrixPage);
