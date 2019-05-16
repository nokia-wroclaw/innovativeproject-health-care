import React from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';

const PendingSurvey = ({ survey }) => {
  const content = survey.id ? (
    <React.Fragment>
      <p>
        This version of survey will become active on {survey.date}. Until then
        you can still overwrite it by publishing a draft.
      </p>
      <QuestionList survey={survey} />
    </React.Fragment>
  ) : (
    <p>There is no pending surevey for this tribe.</p>
  );
  return content;
};

const mapStateToProps = state => ({
  survey: state.surveys.next
});

export default connect(mapStateToProps)(PendingSurvey);
