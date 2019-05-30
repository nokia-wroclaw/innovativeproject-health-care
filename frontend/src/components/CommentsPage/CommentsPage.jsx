import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Dropdown } from 'semantic-ui-react';
import {setUserManagingDetails} from "../../store/actions/user";
import { setTeamAnswers } from './../../store/actions/results';
import Comments from './Comments';
import TemplatePage from '../common/TemplatePage/';
import Loader from "../common/Loader";

const CommentsPage = ({ user, managing, ...props }) => {
  const [currentTeamId, setCurrentTeamId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (managing[0]) handleTeamSelect(null, { value: managing[0].id } )
  }, [managing]);

  useEffect(() => {
    props.setUserManagingDetails(user);
  }, []);

  const handleTeamSelect = (e, { value }) => {
    setIsLoading(true);
    setCurrentTeamId(value);
    props.setTeamAnswers(value).then(() => setIsLoading(false));
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder='Select team'
          options={managing.map((team, i) => ({
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
        {!isLoading && currentTeamId ? (
          <Comments />
        ) : (
          <p>Please, select team</p>
        )}
        {isLoading ? <Loader active inline="centered" /> : null}
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
