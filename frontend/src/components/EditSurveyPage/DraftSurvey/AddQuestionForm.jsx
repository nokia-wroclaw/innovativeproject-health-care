import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Input, Icon, Form } from 'semantic-ui-react';
import { addQuestionToDraftSurvey } from '../../../store/actions/surveys';

const AddQuestionForm = props => {
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    props.addQuestionToDraftSurvey(newQuestion);
    setNewQuestion('');
  };

  return (
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
  );
};

export default connect(
  null,
  { addQuestionToDraftSurvey }
)(AddQuestionForm);
