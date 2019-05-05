import React from "react";
import { Segment, Button, Input, Grid, Container } from "semantic-ui-react";
import DraftQuestion from "./DraftQuestion";

const DraftSurvey = () => {
  return (
    <React.Fragment>
      <Segment.Group>
        <DraftQuestion />
        <DraftQuestion />
        <DraftQuestion />
        <Segment>
          <Input
            type="text"
            placeholder="New question..."
            action={{ color: "green", icon: "add" }}
            fluid
            icon="edit"
            iconPosition="left"
            onChange={() => {}}
          />
        </Segment>
      </Segment.Group>
      <Container textAlign="center">
        <Button.Group>
          <Button>Save as draft</Button>
          <Button.Or />
          <Button primary>Save as active survey</Button>
        </Button.Group>
      </Container>
    </React.Fragment>
  );
};

export default DraftSurvey;
