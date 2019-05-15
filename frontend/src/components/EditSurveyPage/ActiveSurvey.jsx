import React from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Question from './Question';

const ActiveSurvey = ({ survey }) => {
  return (
    <Segment.Group>
      {survey.questions
        ? survey.questions.map(question => (
            <Question
              value={`${question.order}. ${question.value}`}
              key={question.id}
            />
          ))
        : null}
    </Segment.Group>
  );
};

const mapStateToProps = state => ({
  survey: state.surveys.active
});

export default connect(mapStateToProps)(ActiveSurvey);
