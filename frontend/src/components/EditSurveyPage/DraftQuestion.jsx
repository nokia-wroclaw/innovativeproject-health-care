import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Input, Grid } from 'semantic-ui-react';
import {
  deleteQuestionFromDraftSurvey,
  updateQuestionInDraftSurvey
} from '../../store/actions/surveys';

const DraftQuestion = ({ question, ...props }) => {
  const handleDeleteQuestion = () => {
    props.deleteQuestionFromDraftSurvey(question);
  };

  const handleQuestionChange = (e, { value }) => {
    const newQuestion = { ...question };
    newQuestion.question = value;
    props.updateQuestionInDraftSurvey(newQuestion);
  };

  return (
    <Segment>
      <Grid stackable>
        <Grid.Column width={12}>
          <Input
            fluid
            icon='edit'
            iconPosition='left'
            defaultValue={question.question}
            onChange={handleQuestionChange}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Button icon='arrows alternate vertical' floated='right' />
          <Button
            icon='trash alternate'
            floated='right'
            negative
            onClick={handleDeleteQuestion}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default connect(
  null,
  { deleteQuestionFromDraftSurvey, updateQuestionInDraftSurvey }
)(DraftQuestion);
