import React from 'react';
import { connect } from 'react-redux';
import QuestionSegment from './QuestionSegment';
import { Button, Form } from 'semantic-ui-react';
import Faces from './Faces';
import { sendFilledSurvey } from '../../store/actions/currentSurvey';
import '../../styles/common.css';

const Survey = ({ teamId, questions, survey, ...props }) => {
  const validate = () => {
    return questions.every(
      question => question.answer >= 0 && question.answer <= 2
    );
  };

  const content = questions ? (
    <React.Fragment>
      <Faces />
      <Form
        onSubmit={() => {
          props.sendFilledSurvey(teamId, survey);
        }}
      >
        {questions.map(question => (
          <QuestionSegment question={question} key={question.id} />
        ))}
        <Form.Field className='flex-center'>
          <Button type='submit' primary disabled={!validate()}>
            Submit
          </Button>
        </Form.Field>
      </Form>
    </React.Fragment>
  ) : (
    <p>Please, select team</p>
  );

  return content;
};

const mapStateToProps = state => ({
  survey: state.currentSurvey,
  questions: state.currentSurvey.questions
});

export default connect(
  mapStateToProps,
  { sendFilledSurvey }
)(Survey);
