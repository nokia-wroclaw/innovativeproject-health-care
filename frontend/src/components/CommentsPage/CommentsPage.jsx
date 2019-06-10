import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Dropdown } from "semantic-ui-react";
import { setUserManagingDetails } from "../../store/actions/user";
import { setTeamAnswers } from "./../../store/actions/results";
import Comments from "./Comments";
import TemplatePage from "../common/TemplatePage/";
import Loader from "../common/Loader";
import { setTribePeriods } from "../../store/actions/results";

const CommentsPage = ({ user, managing, periods, ...props }) => {
  const [currentTeamId, setCurrentTeamId] = useState(undefined);
  const [currentPeriodId, setCurrentPeriodId] = useState(undefined);
  const [currentTribeId, setCurrentTribeId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (managing[0]) handleTeamSelect(null, { value: managing[0].id });
  }, [managing]);

  useEffect(() => {
    props.setUserManagingDetails(user);
  }, []);

  const fetchAnswers = (team_id, period_id = null) => {
    setIsLoading(true);
    props.setTeamAnswers(team_id, period_id).then(() => setIsLoading(false));
  };

  const handleTeamSelect = (e, { value }) => {
    if (value === currentTeamId) return;
    setCurrentTeamId(value);
    fetchAnswers(value);
    let tribeId = managing.find(t => t.id === value).tribe_id;
    if (tribeId === currentTribeId) return;
    setCurrentTribeId(tribeId);
    props.setTribePeriods(tribeId);
  };

  const handlePeriodSelect = (e, { value }) => {
    if (value === currentPeriodId) return;
    setCurrentPeriodId(value);
    fetchAnswers(currentTeamId, value);
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder="Select team"
          options={managing.map((team, i) => ({
            key: i,
            text: team.name,
            value: team.id
          }))}
          selection
          onChange={handleTeamSelect}
          value={currentTeamId}
        />
        <Dropdown
          placeholder="Select period"
          options={periods.map((period, i) => ({
            key: i,
            text: period.date_start,
            value: period.id
          }))}
          selection
          disabled={!currentTeamId}
          onChange={handlePeriodSelect}
          value={currentPeriodId}
        />
        <br />
        <br />
        {!isLoading && currentTeamId ? <Comments /> : <Loader />}
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  managing: state.user.userData.managing || [],
  periods: state.results.tribePeriods || []
});

export default connect(
  mapStateToProps,
  { setUserManagingDetails, setTeamAnswers, setTribePeriods }
)(CommentsPage);
