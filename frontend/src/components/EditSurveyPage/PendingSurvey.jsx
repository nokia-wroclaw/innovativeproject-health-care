import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Input, Container, Header } from 'semantic-ui-react';
import DraftQuestion from './DraftQuestion';

const PendingSurvey = ({ tribeId, survey, ...props }) => {
  return (
    <React.Fragment>
      <Header as='h5'>
        This version of survey will become active on {survey.date}. Until then
        you can still edit it.
      </Header>
      <Segment.Group>
        {survey.questions
          ? survey.questions.map((question, i) => (
              <DraftQuestion question={question} key={i} />
            ))
          : null}
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

const mapStateToProps = state => ({
  survey: state.surveys.next
});

export default connect(mapStateToProps)(PendingSurvey);
