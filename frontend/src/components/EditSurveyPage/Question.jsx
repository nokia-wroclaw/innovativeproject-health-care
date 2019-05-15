import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const Question = ({ value }) => {
  return (
    <Segment>
      <Header as='h4'>{value}</Header>
    </Segment>
  );
};

export default Question;
