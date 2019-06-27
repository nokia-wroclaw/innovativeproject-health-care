import React from "react";
import { connect } from "react-redux";
import { Segment, TextArea, SegmentGroup } from "semantic-ui-react";
import { setComment } from "./../../store/actions/currentSurvey";
import Question from "./Question";
import "./checkbox.css";

const QuestionSegment = ({ question, disabled, ...props }) => {
  const getTextFieldClassName = () => {
    if (question.comment) return "";
    switch (question.answer) {
      case 0:
        return "red-outline";
      case 1:
        return "yellow-outline";
      default:
        return "";
    }
  };

  const isCommentRequired = () => {
    if (question.answer === 0 || question.answer === 1) return true;
    return false;
  };

  return (
    <React.Fragment>
      <SegmentGroup style={{ marginBottom: 10 }}>
        <Segment>
          <Question question={question} />
        </Segment>
        <Segment attached>
          <TextArea
            placeholder={disabled ? "No comment provided" : "Tell us more"}
            className={getTextFieldClassName()}
            required={isCommentRequired()}
            value={question.comment}
            disabled={disabled}
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
