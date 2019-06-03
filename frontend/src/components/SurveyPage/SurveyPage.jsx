import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dropdown, Container, Header } from "semantic-ui-react";
import { setUserTeamsDetails } from "../../store/actions/user";
import {
  setCurrentSurvey,
  setCurrentSurveyTeamId
} from "../../store/actions/currentSurvey";
import { setTeamAnswers } from "./../../store/actions/results";
import Survey from "./Survey";
import TemplatePage from "../common/TemplatePage/";
import Loader from "./../common/Loader/";

const SurveyPage = ({
  user,
  teams,
  loading,
  currentTeamId,
  surveyIsActive,
  ...props
}) => {
  useEffect(() => {
    if (teams[0]) handleTeamSelect(null, { value: teams[0].id });
  }, [teams]);

  useEffect(() => {
    props.setUserTeamsDetails(user);
  }, []);

  const handleTeamSelect = (e, { value }) => {
    if (value === currentTeamId) return;
    props.setCurrentSurveyTeamId(value);
    props.setTeamAnswers(value);
    const { tribe_id } = teams.find(team => team.id === value);
    props.setCurrentSurvey(tribe_id);
  };

  const content = surveyIsActive ? (
    <Survey />
  ) : (
    <Header as="h5">Survey for this team has been submitted.</Header>
  );

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder="Select team"
          options={teams.map((team, i) => ({
            key: i,
            text: team.name,
            value: team.id
          }))}
          selection
          onChange={handleTeamSelect}
          value={currentTeamId}
        />
        {loading ? <Loader /> : content}
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  teams: state.user.userData.teams,
  loading: state.currentSurvey.isLoading,
  currentTeamId: state.currentSurvey.team_id,
  surveyIsActive: !state.results.team.length
});

export default connect(
  mapStateToProps,
  {
    setUserTeamsDetails,
    setCurrentSurvey,
    setCurrentSurveyTeamId,
    setTeamAnswers
  }
)(SurveyPage);
