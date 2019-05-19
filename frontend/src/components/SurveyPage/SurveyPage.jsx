import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Container } from 'semantic-ui-react';
import { setUserTeamsDetails } from '../../store/actions/user';
import { setCurrentSurvey } from '../../store/actions/currentSurvey';
import Survey from './Survey';
import TemplatePage from '../common/TemplatePage/';
import Loader from './../common/Loader/';

const SurveyPage = ({ user, teams, loading, ...props }) => {
  const [currentTeamId, setCurrentTeamId] = useState(undefined);

  useEffect(() => {
    props.setUserTeamsDetails(user);
  }, []);

  const handleTeamSelect = (e, { value }) => {
    setCurrentTeamId(value);
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
        {loading ? <Loader /> : <Survey teamId={currentTeamId} />}
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  teams: state.user.userData.teams,
  loading: state.currentSurvey.isLoading
});

export default connect(
  mapStateToProps,
  { setUserTeamsDetails, setCurrentSurvey }
)(SurveyPage);
