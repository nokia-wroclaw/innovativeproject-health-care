import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Container } from 'semantic-ui-react';
import { setUserTeamsDetails } from '../../store/actions/user';
import { setCurrentSurvey } from '../../store/actions/currentSurvey';
import Survey from './Survey';
import TemplatePage from '../common/TemplatePage/';

const SurveyPage = ({ user, ...props }) => {
  const [currentTeamId, setCurrentTeamId] = useState(undefined);

  useEffect(() => {
    props.setUserTeamsDetails(user);
  }, []);

  const handleTeamSelect = (e, { value }) => {
    setCurrentTeamId(value);
    props.setCurrentSurvey(value);
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder='Select team'
          options={props.teams.map((team, i) => ({
            key: i,
            text: team.name,
            value: team.id
          }))}
          selection
          onChange={handleTeamSelect}
          value={currentTeamId}
        />
        <Survey teamId={currentTeamId} />
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  teams: state.user.userData.teams
});

export default connect(
  mapStateToProps,
  { setUserTeamsDetails, setCurrentSurvey }
)(SurveyPage);
