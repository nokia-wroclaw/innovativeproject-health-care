import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

const ActiveSurvey = ({ survey }) => {
  return (
    <Segment.Group>
      {survey.questions
        ? survey.questions.map(item => (
            <Segment>
              <Header as='h4'>{item.question}</Header>
            </Segment>
          ))
        : null}
    </Segment.Group>
  );
};

const mapStateToProps = state => ({
  survey: state.surveys.active
});

export default connect(mapStateToProps)(ActiveSurvey);
