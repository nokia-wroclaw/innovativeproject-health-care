import React from 'react';
import { connect } from 'react-redux';
import { List, Button, Header } from "semantic-ui-react";
import { DateTime } from 'luxon';
import {isEmpty} from 'lodash';
import { getAnswersByDate } from "../../store/reducers/answers";
import { removeAnswersFromDate } from "../../store/actions/answers";
import { confirmDialog } from "../common/functions";

export const AnswersListComponent = ({ answers, teamId, removeAnswer }) => {
  const handleDelete = date => () => {
    if (confirmDialog(`answers for this team from ${date}`)) {
      removeAnswer(teamId, date);
    }
  }
  return !isEmpty(answers) ? (
    <List size='huge' style={ { width: '50%' } } divided verticalAlign='middle'>
      { Object.keys(answers).map(date => {
        return (
          <List.Item key={date}>
            <List.Content floated='right'>
              <Button negative circular icon='trash' onClick={handleDelete(date)} />
            </List.Content>
            <List.Header>
              { DateTime.fromISO(date).toFormat('MMMM yyyy') }
            </List.Header>

          </List.Item>
        )
      }) }
    </List>
  ) : <Header as='h4'>No answers found for this team</Header>
};

const mapStateToProps = state => ({
  answers: getAnswersByDate(state)
});
export const AnswerList = connect(
  mapStateToProps, { removeAnswer: removeAnswersFromDate }
)(AnswersListComponent);
