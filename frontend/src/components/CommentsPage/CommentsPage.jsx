import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Dropdown } from 'semantic-ui-react';
import {setUserManagingDetails} from "../../store/actions/user";
import { setTeamAnswers } from './../../store/actions/results';
import Comments from './Comments';
import TemplatePage from '../common/TemplatePage/';

const CommentsPage = ({ user, ...props }) => {
  const [currentTeamId, setCurrentTeamId] = useState(undefined);

  useEffect(() => {
    props.setUserManagingDetails(user);
  }, []);

  const handleTeamSelect = (e, { value }) => {
    setCurrentTeamId(value);
    props.setTeamAnswers(value);
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder='Select team'
          options={props.managing.map((team, i) => ({
            key: i,
            text: team.name,
            value: team.id
          }))}
          selection
          onChange={handleTeamSelect}
          value={currentTeamId}
        />
        <br />
        <br />
        {currentTeamId ? (
          <Comments />
        ) : (
          <p>Please, select team</p>
        )}
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  managing: state.user.userData.managing
});

export default connect(
  mapStateToProps,
  { setUserManagingDetails, setTeamAnswers }
)(CommentsPage);
