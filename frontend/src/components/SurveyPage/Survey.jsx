import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionSegment from "./QuestionSegment";
import { Container, Button, Form } from "semantic-ui-react";
import Faces from "./Faces";
import "../../styles/common.css";

class Survey extends Component {
  validate = () => {
    return this.props.questions.every(
      question => question.answer >= 0 && question.answer <= 2
    );
  };

  render() {
    const { questions } = this.props;
    return (
      <Container style={{ marginTop: 20 }}>
        <Faces />
        <Form
          onSubmit={() => {
            /* call backend - send the survey */
          }}
        >
          {questions.map((question, i) => (
            <QuestionSegment question={question} key={i} />
          ))}
          <Form.Field className="flex-center">
            <Button type="submit" primary disabled={!this.validate()}>
              Submit
            </Button>
          </Form.Field>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.survey.activeQuestions
});

export default connect(mapStateToProps)(Survey);
