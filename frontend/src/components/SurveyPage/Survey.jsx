import React, { useState } from "react";
import { connect } from "react-redux";
import QuestionSegment from "./QuestionSegment";
import { Button, Form, Header, Message } from "semantic-ui-react";
import Faces from "./Faces";
import { sendFilledSurvey } from "../../store/actions/currentSurvey";
import { setTeamAnswers } from "./../../store/actions/results";
import "../../styles/common.css";

const mergeQuestionsAnswers = (questions, answers) => {
  if (!questions) return;
  if (!answers.length) return questions;
  return questions.map((q, i) => {
    return {
      ...q,
      answer: answers[i] ? answers[i].answer : null,
      comment: answers[i] && answers[i].comment != null ? answers[i].comment : ""
    }
  });
};

const Survey = ({ questions, answers, survey, ...props }) => {
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

  let data = mergeQuestionsAnswers(questions, answers);

  return questions && questions.length ? (
    <React.Fragment>
      {answers.length ? (
        <Message>
          This survey is already submitted, and thus read-only.
        </Message>
      ) : null}
      <Faces/>
      <Form onSubmit={handleSubmit}>
        {data.map(question => (
          <QuestionSegment question={question} key={question.id}/>
        ))}
        {!answers.length ? (
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
        ) : null}
      </Form>
    </React.Fragment>
  ) : (
    <Header as="h5">There is no survey to show.</Header>
  );
};

const mapStateToProps = state => ({
  survey: state.currentSurvey,
  questions: state.currentSurvey.questions,
  answers: state.results.team
});

export default connect(
  mapStateToProps,
  { sendFilledSurvey, setTeamAnswers }
)(Survey);
