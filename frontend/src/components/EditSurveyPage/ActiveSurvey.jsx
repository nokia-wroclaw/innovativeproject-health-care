import React from "react";
import { Segment, Header } from "semantic-ui-react";

const ActiveSurvey = () => {
  return (
    <Segment.Group>
      <Segment>
        <Header as="h4">Question 1</Header>
      </Segment>
      <Segment>
        <Header as="h4">Question 2</Header>
      </Segment>
      <Segment>
        <Header as="h4">Question 3</Header>
      </Segment>
      <Segment>
        <Header as="h4">Question 4</Header>
      </Segment>
      <Segment>
        <Header as="h4">Question 5</Header>
      </Segment>
    </Segment.Group>
  );
};

export default ActiveSurvey;
