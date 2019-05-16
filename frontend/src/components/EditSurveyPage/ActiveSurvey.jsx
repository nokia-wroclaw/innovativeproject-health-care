import React from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';

const ActiveSurvey = ({ survey }) => {
  const content = survey.id ? (
    <QuestionList survey={survey} />
  ) : (
    <p>
      There is no active survey for this tribe. Please create one by publishing
      a draft.
    </p>
  );
  return content;
};

const mapStateToProps = state => ({
  survey: state.surveys.active
});

export default connect(mapStateToProps)(ActiveSurvey);
