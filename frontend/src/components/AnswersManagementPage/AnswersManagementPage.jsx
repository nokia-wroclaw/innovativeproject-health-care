import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {flow, getOr, map} from 'lodash/fp';
import TemplatePage from "../common/TemplatePage";
import { Container, Dropdown, Header } from "semantic-ui-react";
import { setTribes } from "../../store/actions/tribes";
import { getTribesById, getTribesForSelector } from "../../store/reducers/tribes&teams";

import styles from './AnswersManagementPage.module.scss';
import { getAnswers, resetAnswers } from "../../store/actions/answers";
import { AnswerList } from "./AnswersList";

export const AnswersManagementPageComponent = ({tribes, getTribes, tribesById, getAnswers, resetAnswers}) => {

  const [tribe, setTribe] = useState(null);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    getTribes();
  }, []);

  const handleTribeChange = (_, {value}) => {
    if (tribe !== value) {
      setTribe(value);
      resetAnswers();
      setTeam(null)
    }
  };
  const tribeDropdown = () => (
    <Dropdown
      selection
      value={tribe}
      onChange={handleTribeChange}
      options={tribes}
    />
  );

  const teamOptions = flow(
    getOr([], 'teams'),
    map(team => ({
      ...team,
      text: team.name,
      value: team.id
    }))
  )(tribesById[tribe]);
  const handleTeamChange = (_, {value}) => {
    if (value !== team) {
      setTeam(value);
      resetAnswers();
      getAnswers(value);
    }
  };
  const teamDropdown = () => (
    <Dropdown
      selection
      value={team}
      onChange={handleTeamChange}
      options={teamOptions}
    />
  );

  return (
    <TemplatePage>
      <Container>
        <Header className={styles.header}>Answers management</Header>
        <div className={styles.selectors}>
          <div>
            <Header as='h5'>Select tribe</Header>
            {tribeDropdown()}
          </div>
          <div>
            <Header as='h5'>Select team</Header>
            {teamDropdown()}
          </div>
        </div>

        {team ? <AnswerList teamId={team} /> : <Header as='h4'>Please select team</Header>}
      </Container>

    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  tribes: getTribesForSelector(state),
  tribesById: getTribesById(state)
});
export const AnswersManagementPage = connect(
  mapStateToProps,
  {getTribes: setTribes, getAnswers, resetAnswers}
)(AnswersManagementPageComponent)
