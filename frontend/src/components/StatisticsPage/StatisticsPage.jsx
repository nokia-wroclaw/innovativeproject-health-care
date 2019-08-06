import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TemplatePage from "../common/TemplatePage/";
import { Container, Dropdown, Header } from "semantic-ui-react";
import { setTribeHistory } from "../../store/actions/results";
import { setUserTribesDetails } from "../../store/actions/user";
import Charts from "./Charts";
import Loader from "../common/Loader";

import styles from './StatisticsPage.module.scss';

const StatisticsPage = ({ user, tribes, ...props }) => {
  const [currentTribeId, setCurrentTribeId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState(6);

  const periods = [
    {value: 3, text: "last 3 months"},
    {value: 6, text: "last 6 months"},
    {value: 12, text: "last year"},
    {value: 24, text: "last 2 years"}
  ];

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
    props.setTribeHistory(value, period).then(() => setIsLoading(false));
  };

  const handlePeriodChange = async (_, {value}) => {
    if (value === period) return;
    setPeriod(value);
    setIsLoading(true);
    await props.setTribeHistory(currentTribeId, value);
    setIsLoading(false);
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <div className={styles.selectors}>
          <span>
            <Header as='h5'>Tribe</Header>
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
          </span>

          <span>
            <Header as='h5'>Period</Header>
            <Dropdown
              placeholder="Select period"
              options={periods}
              selection
              value={period}
              onChange={handlePeriodChange}
            />
          </span>

        </div>
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
