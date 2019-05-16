import React from 'react';
import { Segment, Button, Input, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { sortableHandle } from 'react-sortable-hoc';
import {
  deleteQuestionFromDraftSurvey,
  updateQuestionInDraftSurvey
} from '../../../store/actions/surveys';

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

  return (
    <Segment>
      <Grid stackable>
        <Grid.Column width={12}>
          <Input
            fluid
            icon='edit'
            iconPosition='left'
            value={question.value}
            onChange={handleQuestionChange}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <DragHandle />
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
