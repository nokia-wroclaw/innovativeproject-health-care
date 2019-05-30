import React from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import { deleteSurvey } from '../../store/actions/surveys';
import { Button, Container } from "semantic-ui-react";

const PendingSurvey = ({ survey, ...props }) => {
  const handleDelete = () => {
    props.deleteSurvey(survey);
  };

  const content = survey.id ? (
    <React.Fragment>
      <p>
        This version of survey will become active on {survey.date}. Until then
        you can still overwrite it by publishing a draft.
      </p>
      <QuestionList survey={survey} />
      <Container textAlign='center'>
        <Button onClick={handleDelete}>Delete pending</Button>
      </Container>
    </React.Fragment>
  ) : (
    <p>There is no pending survey for this tribe.</p>
  );
  return content;
};

const mapStateToProps = state => ({
  survey: state.surveys.next
});

export default connect(
  mapStateToProps,
  {
    deleteSurvey
  }
)(PendingSurvey);
