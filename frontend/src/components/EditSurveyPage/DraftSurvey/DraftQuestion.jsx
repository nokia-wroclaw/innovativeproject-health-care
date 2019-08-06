import React from 'react';
import { Segment, Button, Icon, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { sortableHandle } from 'react-sortable-hoc';
import {
  deleteQuestionFromDraftSurvey,
  updateQuestionInDraftSurvey
} from '../../../store/actions/surveys';
import "./questionInput.css";

const DragHandle = sortableHandle(() => (
  <Button icon='arrows alternate vertical' floated='right' />
));

const DraftQuestion = ({ question, ...props }) => {
  const handleDeleteQuestion = () => {
    props.deleteQuestionFromDraftSurvey(question);
  };

  const handleQuestionChange = (e, { value }) => {
    const newQuestion = { ...question };
    newQuestion.value = value;
    props.updateQuestionInDraftSurvey(newQuestion);
  };

  const handleSubjectChange = (e, { value }) => {
    const newQuestion = { ...question };
    newQuestion.subject = value;
    props.updateQuestionInDraftSurvey(newQuestion);
  };

  return (
    <Segment>
      <Form>
        <Form.Group className="questionGroup">
          <Form.Field>
            <Icon name="edit" className="editIcon" />
          </Form.Field>
          <Form.Input 
            value={question.subject}
            onChange={handleSubjectChange} 
            width={3} />
          <Form.Input 
            value={question.value}
            onChange={handleQuestionChange}
            width={12} />
          <Form.Field width={2}>
            <DragHandle /> 
            <Button
              icon='trash alternate'
              floated='right'
              negative
              onClick={handleDeleteQuestion}
            />
          </Form.Field> 
        </Form.Group>
      </Form>
    </Segment>
  );
};

const mapStateToProps = state => ({
  survey: state.surveys.draft
});

export default connect(
  mapStateToProps,
  {
    deleteQuestionFromDraftSurvey,
    updateQuestionInDraftSurvey
  }
)(DraftQuestion);
