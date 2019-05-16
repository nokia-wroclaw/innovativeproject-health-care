import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const QuestionList = ({ survey }) => {
  return (
    <Segment.Group>
      {survey.questions
        ? survey.questions.map(question => (
            <Segment key={question.id}>
              <Header as='h4'>{`${question.order}. ${question.value}`}</Header>
            </Segment>
          ))
        : null}
    </Segment.Group>
  );
};

export default QuestionList;
