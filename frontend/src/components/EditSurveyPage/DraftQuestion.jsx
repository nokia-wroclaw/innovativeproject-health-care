import React from "react";
import { Segment, Button, Input, Grid } from "semantic-ui-react";

const DraftQuestion = () => {
  return (
    <Segment>
      <Grid stackable>
        <Grid.Column width={12}>
          <Input
            fluid
            icon="edit"
            iconPosition="left"
            defaultValue="Question 1 "
            onChange={() => {}}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Button icon="arrows alternate vertical" floated="right" />
          <Button
            icon="trash alternate"
            //   labelPosition="left"
            floated="right"
            //   content="Delete"
            negative
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default DraftQuestion;
