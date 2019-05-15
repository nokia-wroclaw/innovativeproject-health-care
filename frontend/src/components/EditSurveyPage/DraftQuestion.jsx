import React from 'react';
import { Segment, Button, Input, Grid } from 'semantic-ui-react';

const DraftQuestion = ({ value, onDelete, onChange }) => {
  return (
    <Segment>
      <Grid stackable>
        <Grid.Column width={12}>
          <Input
            fluid
            icon='edit'
            iconPosition='left'
            value={value}
            onChange={onChange}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Button icon='arrows alternate vertical' floated='right' />
          <Button
            icon='trash alternate'
            floated='right'
            negative
            onClick={onDelete}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default DraftQuestion;
