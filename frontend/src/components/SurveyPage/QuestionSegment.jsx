import React from 'react';
import { Segment, TextArea, SegmentGroup } from 'semantic-ui-react';
import Question from './Question';
import './checkbox.css';

const QuestionSegment = ({ question }) => {
  let textareaClassName;
  switch (question.answer) {
    case 0:
      textareaClassName = 'red-outline';
      break;
    case 1:
      textareaClassName = 'yellow-outline';
      break;
    default:
      textareaClassName = '';
  }

  return (
    <React.Fragment>
      <SegmentGroup style={{ marginBottom: 10 }}>
        <Segment>
          <Question question={question} />
        </Segment>
        <Segment attached>
          <TextArea
            placeholder='Tell us more'
            className={textareaClassName}
            required={textareaClassName}
          />
        </Segment>
      </SegmentGroup>
    </React.Fragment>
  );
};

export default QuestionSegment;
