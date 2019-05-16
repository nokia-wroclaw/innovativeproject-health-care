import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Container } from 'semantic-ui-react';
import Survey from './Survey';
import TemplatePage from '../common/TemplatePage/';

const SurveyPage = props => {
  const [currentTeamId, setCurrentTeamId] = useState(undefined);
  const handleTeamSelect = (e, { value }) => {
    setCurrentTeamId(value);
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder='Select team'
          options={props.teams.map(team => ({
            key: team.id,
            text: team.name,
            value: team.id
          }))}
          selection
          onChange={handleTeamSelect}
          value={currentTeamId}
        />
        <Survey />
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  teams: state.user.userData.teams
});

export default connect(mapStateToProps)(SurveyPage);
