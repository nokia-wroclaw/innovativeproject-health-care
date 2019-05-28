import React, { useState, useEffect } from 'react';
import _ from "lodash"
import { connect } from "react-redux"
import TemplatePage from '../common/TemplatePage/';
import { Container, Dropdown } from "semantic-ui-react";
import { setTribeHistory } from "../../store/actions/results";
import {
  setUserEditingDetails,
  setUserManagingDetails,
  setUserTribesDetails
} from "../../store/actions/user";
import Charts from "./Charts";
import Loader from "../common/Loader";

const StatisticsPage = ({ user, tribes, ...props}) => {
  const [currentTribeId, setCurrentTribeId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    props.setUserTribesDetails(user);
    props.setUserManagingDetails(user);
    props.setUserEditingDetails(user);
  }, []);

  const handleTribeSelect = (e, { value }) => {
    setIsLoading(true);
    setCurrentTribeId(value);
    props.setTribeHistory(value, 6).then(() => setIsLoading(false));
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder='Select tribe'
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
        <br />
        {!isLoading && currentTribeId ? (
          <Charts />
        ) : (
          <p>Please, select tribe</p>
        )}
        {isLoading ? <Loader active inline="centered" /> : null}
      </Container>
    </TemplatePage>
  );

};

const mapStateToProps = state => {
  const user = state.user.userData;
  const managing =
    user.managing.map(team => ({
      id: team.tribe_id,
      name: team.name
    })) || [];
  const membering = user.tribes || [];
  const editing = user.editing || [];
  const tribes = [...membering, ...editing, ...managing];
  return {
    user,
    tribes: _.uniqBy(tribes, "id"),
    periods: state.results.tribePeriods
  };
};

export default connect(
  mapStateToProps,
  {
    setUserManagingDetails,
    setUserTribesDetails,
    setUserEditingDetails,
    setTribeHistory
  }
)(StatisticsPage);

