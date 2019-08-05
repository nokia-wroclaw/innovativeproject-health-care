import React, { useState } from "react";
import { connect } from "react-redux";
import { Segment, Button, Input, Icon, Form } from "semantic-ui-react";
import { addQuestionToDraftSurvey } from "../../../store/actions/surveys";
import "./questionInput.css";

const AddQuestionForm = props => {
  const [newQuestion, setNewQuestion] = useState("");
  const [subject, setQuestionSubject] = useState("");

  const handleAddQuestion = () => {
    props.addQuestionToDraftSurvey(newQuestion, subject);
    setNewQuestion("");
    setQuestionSubject("");
  };

  return (
    <Segment>
      <Form onSubmit={handleAddQuestion}>
        <Form.Group className="questionGroup">
          <Form.Field>
            <Icon name="edit" className="editIcon" />
          </Form.Field>
          <Form.Input 
            placeholder="Subject"
            value={subject}
            onChange={(e, { value }) => {
              setQuestionSubject(value)}}
            width={3}
          />
          <Form.Input 
            placeholder="New question"
            value={newQuestion}
            onChange={(e, { value }) => {
              setNewQuestion(value)}}
            width={13}
          />
          <Form.Field width={1}>
            <Button
              type="submit"
              color="green"
              floated="right"
              icon="add"
              disabled={!newQuestion || !subject}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    </Segment>
  );
};

export default connect(
  null,
  { addQuestionToDraftSurvey }
)(AddQuestionForm);
