import React, { useState } from "react";
import { connect } from "react-redux";
import QuestionSegment from "./QuestionSegment";
import { Button, Form, Header } from "semantic-ui-react";
import Faces from "./Faces";
import { sendFilledSurvey } from "../../store/actions/currentSurvey";
import { setTeamAnswers } from "./../../store/actions/results";
import "../../styles/common.css";

const Survey = ({ questions, survey, ...props }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const validate = () => {
    const allQuestionsAnswered = questions.every(
      question =>
        question.answer === 0 || question.answer === 1 || question.answer === 2
    );
    const allRequiredCommentsProvided = questions.every(
      question =>
        !(
          (question.answer === 0 || question.answer === 1) &&
          (!question.comment || question.comment.trim() === "")
        )
    );
    return allQuestionsAnswered && allRequiredCommentsProvided;
  };

  const handleSubmit = () => {
    setBtnLoading(true);
    props.sendFilledSurvey(survey).then(() => {
      setBtnLoading(false);
      props.setTeamAnswers(survey.team_id);
    });
  };

  const content =
    questions && questions.length ? (
      <React.Fragment>
        <Faces />
        <Form onSubmit={handleSubmit}>
          {questions.map(question => (
            <QuestionSegment question={question} key={question.id} />
          ))}
          <Form.Field className="flex-center">
            <Button
              type="submit"
              primary
              disabled={!validate()}
              loading={btnLoading}
            >
              Submit
            </Button>
          </Form.Field>
        </Form>
      </React.Fragment>
    ) : (
      <Header as="h5">There is no survey to show.</Header>
    );

  return content;
};

const mapStateToProps = state => ({
  survey: state.currentSurvey,
  questions: state.currentSurvey.questions
});

export default connect(
  mapStateToProps,
  { sendFilledSurvey, setTeamAnswers }
)(Survey);
