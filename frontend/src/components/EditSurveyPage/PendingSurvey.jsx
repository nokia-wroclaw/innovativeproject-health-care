import React from 'react';
import { Segment, Button, Input, Container } from 'semantic-ui-react';
import DraftQuestion from './DraftQuestion';
import { Header } from 'semantic-ui-react';

const PendingSurvey = () => {
  return (
    <React.Fragment>
      <Header as='h5'>
        This version of survey will become active on 1.06.2019. Until then you
        can still edit it.
      </Header>
      <Segment.Group>
        <DraftQuestion />
        <DraftQuestion />
        <DraftQuestion />
        <Segment>
          <Input
            type='text'
            placeholder='New question...'
            action={{ color: 'green', icon: 'add' }}
            fluid
            icon='edit'
            iconPosition='left'
            onChange={() => {}}
          />
        </Segment>
      </Segment.Group>
      <Container textAlign='center'>
        <Button primary>Save</Button>
      </Container>
    </React.Fragment>
  );
};

export default PendingSurvey;
