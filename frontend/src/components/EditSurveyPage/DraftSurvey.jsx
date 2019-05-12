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
  saveDraftSurvey
} from '../../store/actions/surveys';
import DraftQuestion from './DraftQuestion';

const DraftSurvey = ({ tribeId, survey, ...props }) => {
  const [newQuestion, setNewQuestion] = useState('');
  const handleAddQuestion = () => {
    props.addQuestionToDraftSurvey(newQuestion);
  };
  const handleSaveAsDraft = () => {
    props.saveDraftSurvey(tribeId, survey);
  };
  return (
    <React.Fragment>
      <Segment.Group>
        {survey.questions
          ? survey.questions.map((question, i) => (
              <DraftQuestion question={question} key={i} />
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
          <Button onClick={handleSaveAsDraft}>Save as draft</Button>
          <Button.Or />
          <Button primary>Save as active survey</Button>
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
  { addQuestionToDraftSurvey, saveDraftSurvey }
)(DraftSurvey);
