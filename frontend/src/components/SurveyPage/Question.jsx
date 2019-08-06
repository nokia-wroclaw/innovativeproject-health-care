import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import ColoredCheckbox from './ColoredCheckbox';
import './question.css';

const Question = ({ question }) => {
  return (
    <Grid>
      <Grid.Column mobile={10} tablet={13} computer={13}>
        <Header as='h5' className="questionHeader">{question.subject}</Header>
        <span>{question.value}</span>
        <span className="requiredField">
          {(question.answer === 0 || question.answer === 1) & !question.comment ? ' *' : ''}
        </span>
      </Grid.Column>
      <Grid.Column mobile={6} tablet={3} computer={3}>
        <div className='flex-space-evenly'>
          <ColoredCheckbox
            color='green'
            value={2}
            question={question}
            hintText="It's OK"
          />
          <ColoredCheckbox
            color='yellow'
            value={1}
            question={question}
            hintText="It's not bad but could be better"
          />
          <ColoredCheckbox
            color='red'
            value={0}
            question={question}
            hintText="It's really bad"
          />
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default Question;
