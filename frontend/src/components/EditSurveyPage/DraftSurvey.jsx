import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Button,
  Input,
  Container,
  Icon,
  Form
} from 'semantic-ui-react';
import {
  addQuestionToDraftSurvey,
  deleteQuestionFromDraftSurvey,
  updateQuestionInDraftSurvey,
  saveDraftSurvey,
  saveAndPublishDraftSurvey
} from '../../store/actions/surveys';
import DraftQuestion from './DraftQuestion';

const DraftSurvey = ({ tribeId, survey, ...props }) => {
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    props.addQuestionToDraftSurvey(newQuestion);
    setNewQuestion('');
  };
  const handleDeleteQuestion = question => {
    props.deleteQuestionFromDraftSurvey(question);
  };
  const handleQuestionChange = (question, value) => {
    const newQuestion = { ...question };
    newQuestion.value = value;
    props.updateQuestionInDraftSurvey(newQuestion);
  };
  const handleSaveDraft = () => {
    props.saveDraftSurvey(tribeId, survey);
  };
  const handleSaveAndPublish = () => {
    props.saveAndPublishDraftSurvey(tribeId, survey);
  };

  return (
    <React.Fragment>
      <Segment.Group>
        {survey.questions
          ? survey.questions.map((question, i) => (
              <DraftQuestion
                value={question.value}
                key={i}
                onDelete={() => handleDeleteQuestion(question)}
                onChange={(e, { value }) =>
                  handleQuestionChange(question, value)
                }
              />
            ))
          : null}

        <Segment>
          <Form onSubmit={handleAddQuestion}>
            <Input
              type='text'
              placeholder='New question...'
              action
              fluid
              icon
              iconPosition='left'
              value={newQuestion}
              onChange={(e, { value }) => {
                setNewQuestion(value);
              }}
            >
              <Icon name='edit' />
              <input />
              <Button type='submit' color='green' icon='add' />
            </Input>
          </Form>
        </Segment>
      </Segment.Group>
      <Container textAlign='center'>
        <Button.Group>
          <Button onClick={handleSaveDraft}>Save draft</Button>
          <Button.Or />
          <Button primary onClick={handleSaveAndPublish}>
            Publish
          </Button>
        </Button.Group>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  survey: state.surveys.draft
});

export default connect(
  mapStateToProps,
  {
    addQuestionToDraftSurvey,
    deleteQuestionFromDraftSurvey,
    updateQuestionInDraftSurvey,
    saveDraftSurvey,
    saveAndPublishDraftSurvey
  }
)(DraftSurvey);
