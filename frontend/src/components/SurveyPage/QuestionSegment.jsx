import React from 'react';
import { connect } from 'react-redux';
import { Segment, TextArea, SegmentGroup } from 'semantic-ui-react';
import { setComment } from './../../store/actions/currentSurvey';
import Question from './Question';
import './checkbox.css';

const QuestionSegment = ({ question, ...props }) => {
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
            value={question.comment}
            onChange={(e, { value }) => {
              props.setComment(question.id, value);
            }}
          />
        </Segment>
      </SegmentGroup>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  survey: state.currentSurvey
});

export default connect(
  mapStateToProps,
  { setComment }
)(QuestionSegment);
