import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dropdown, Container, Grid } from "semantic-ui-react";
import { setUserTeamsDetails } from "../../store/actions/user";
import { setCurrentSurvey, setCurrentSurveyTeamId } from "../../store/actions/currentSurvey";
import { setTeamAnswers } from "./../../store/actions/results";
import Survey from "./Survey";
import TemplatePage from "../common/TemplatePage/";
import Loader from "./../common/Loader/";
import { DateTime } from "luxon";
import { setUserTribesDetails } from "../../store/actions/user";
import { setTribeMatrix, setTribePeriods } from "../../store/actions/results";

const SurveyPage = ({ user, teams, currentTeamId, surveyIsActive, tribes, periods, ...props }) => {
  const [currentTribeId, setCurrentTribeId] = useState(undefined);
  const [currentPeriodId, setCurrentPeriodId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (teams[0]) initialTeamSelect();
  }, [teams]);

  useEffect(() => {
    props.setUserTeamsDetails(user);
  }, []);

  useEffect(() => {
    if (tribes[0]) handleTribeSelect(null, { value: tribes[0].id });
  }, [tribes]);

  useEffect(() => {
    if (periods[0]) setCurrentPeriodId(periods[0].id);
  }, [periods]);

  useEffect(() => {
    props.setUserTribesDetails(user);
  }, []);

  const initialTeamSelect = () => {
    setIsLoading(true);
    let promises = [
      props.setCurrentSurveyTeamId(teams[0].id),
      props.setTeamAnswers(teams[0].id),
      props.setCurrentSurvey(teams[0].tribe_id)
    ];
    Promise.all(promises).then(() => setIsLoading(false));
  }

  const handleTeamSelect = (e, { value }) => {
    if (value === currentTeamId) return;
    setIsLoading(true);
    const { tribe_id } = teams.find(team => team.id === value);
    let promises = [
      props.setCurrentSurveyTeamId(value),
      props.setTeamAnswers(value),
      props.setCurrentSurvey(tribe_id)
    ];
    Promise.all(promises).then(() => setIsLoading(false));
  };

  const handleTribeSelect = (e, { value }) => {
    if (value === currentTribeId) return;
    setCurrentTribeId(value);
    fetchMatrix(value);
    props.setTribePeriods(value);
  };

  const fetchMatrix = (tribeId, periodId = null) => {
    setIsLoading(true);
    props.setTribeMatrix(tribeId, periodId).then(() => setIsLoading(false));
  };

  const handlePeriodSelect = (e, { value }) => {
    if (value === currentPeriodId) return;
    setCurrentPeriodId(value);
    fetchMatrix(tribes[0].id, value);
    props.setTeamAnswers(currentTeamId, value);
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder="Select team"
          options={ teams.map((team, i) => ({
            key: i,
            text: team.name,
            value: team.id
          })) }
          selection
          onChange={ handleTeamSelect }
          value={ currentTeamId }
        />
        <Dropdown
          placeholder="Select period"
          options={ periods.map((period, i) => ({
            key: i,
            text: DateTime.fromISO(period.date_start).toFormat('MMMM yyyy'),
            value: period.id
          })) }
          selection
          // disabled={!currentTribeId}
          onChange={ handlePeriodSelect }
          value={ currentPeriodId }
        />
        { isLoading ? <Loader /> : <Survey periodId={ currentPeriodId } /> }
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  teams: state.user.teams || [],
  currentTeamId: state.currentSurvey.team_id,
  surveyIsActive: !state.results.team.length,
  tribes: state.user.tribes || [],
  periods: state.results.tribePeriods || []
});

export default connect(
  mapStateToProps,
  {
    setUserTeamsDetails,
    setCurrentSurvey,
    setCurrentSurveyTeamId,
    setTeamAnswers,
    setUserTribesDetails,
    setTribeMatrix,
    setTribePeriods
  }
)(SurveyPage);
