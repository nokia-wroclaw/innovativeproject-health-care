import React from 'react';
import { connect } from 'react-redux';
import { Segment, Header } from 'semantic-ui-react';
import Question from './Question';

const PendingSurvey = ({ survey }) => {
  return (
    <React.Fragment>
      <Header as='h5'>
        This version of survey will become active on {survey.date}. Until then
        you can still overwrite it by publishing a draft.
      </Header>
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
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  survey: state.surveys.next
});

export default connect(mapStateToProps)(PendingSurvey);
