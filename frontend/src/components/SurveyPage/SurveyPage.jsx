import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dropdown, Container } from "semantic-ui-react";
import { setUserTeamsDetails } from "../../store/actions/user";
import { setCurrentSurvey, setCurrentSurveyTeamId } from "../../store/actions/currentSurvey";
import { setTeamAnswers } from "./../../store/actions/results";
import Survey from "./Survey";
import TemplatePage from "../common/TemplatePage/";
import Loader from "./../common/Loader/";

const SurveyPage = ({ user, teams, currentTeamId, surveyIsActive, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (teams[0]) handleTeamSelect(null, { value: teams[0].id });
  }, [teams]);

  useEffect(() => {
    props.setUserTeamsDetails(user);
  }, []);

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
        {isLoading ? <Loader />  : <Survey />}
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  teams: state.user.teams || [],
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
