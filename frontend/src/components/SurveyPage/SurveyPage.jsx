import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Container } from 'semantic-ui-react';
import { setUserTeamsDetails } from '../../store/actions/user';
import {
  setCurrentSurvey,
  setCurrentSurveyTeamId
} from '../../store/actions/currentSurvey';
import Survey from './Survey';
import TemplatePage from '../common/TemplatePage/';
import Loader from './../common/Loader/';

const SurveyPage = ({ user, teams, loading, currentTeamId, ...props }) => {

  useEffect(() => {
    if (teams[0]) handleTeamSelect(null, { value: teams[0].id } )
  }, [teams]);

  useEffect(() => {
    props.setUserTeamsDetails(user);
  }, []);

  const handleTeamSelect = (e, { value }) => {
    if (value === currentTeamId) return;
    props.setCurrentSurveyTeamId(value);
    const { tribe_id } = teams.find(team => team.id === value);
    props.setCurrentSurvey(tribe_id);
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder='Select team'
          options={teams.map((team, i) => ({
            key: i,
            text: team.name,
            value: team.id
          }))}
          selection
          onChange={handleTeamSelect}
          value={currentTeamId}
        />
        {loading ? <Loader /> : <Survey />}
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  teams: state.user.userData.teams,
  loading: state.currentSurvey.isLoading,
  currentTeamId: state.currentSurvey.team_id
});

export default connect(
  mapStateToProps,
  { setUserTeamsDetails, setCurrentSurvey, setCurrentSurveyTeamId }
)(SurveyPage);
