import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TemplatePage from "../common/TemplatePage/";
import { Container, Dropdown } from "semantic-ui-react";
import { setTribeHistory } from "../../store/actions/results";
import { setUserTribesDetails } from "../../store/actions/user";
import Charts from "./Charts";
import Loader from "../common/Loader";

const StatisticsPage = ({ user, tribes, ...props }) => {
  const [currentTribeId, setCurrentTribeId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tribes[0]) handleTribeSelect(null, { value: tribes[0].id });
  }, [tribes]);

  useEffect(() => {
    props.setUserTribesDetails(user);
  }, []);

  const handleTribeSelect = (e, { value }) => {
    if (value === currentTribeId) return;
    setIsLoading(true);
    setCurrentTribeId(value);
    props.setTribeHistory(value, 6).then(() => setIsLoading(false));
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder="Select tribe"
          options={tribes.map((tribe, i) => ({
            key: i,
            text: tribe.name,
            value: tribe.id
          }))}
          selection
          onChange={handleTribeSelect}
          value={currentTribeId}
        />
        <br />
        {isLoading || !currentTribeId ? null : <Charts />}
        {isLoading ? <Loader active inline="centered" /> : null}
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  tribes: state.user.tribes || []
});

export default connect(
  mapStateToProps,
  {
    setUserTribesDetails,
    setTribeHistory
  }
)(StatisticsPage);
