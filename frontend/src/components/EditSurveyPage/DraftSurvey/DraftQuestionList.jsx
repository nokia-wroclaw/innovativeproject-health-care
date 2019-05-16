import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import {
  deleteQuestionFromDraftSurvey,
  updateQuestionInDraftSurvey
} from '../../../store/actions/surveys';
import DraftQuestion from './DraftQuestion';
import AddQuestionForm from './AddQuestionForm';

const DraftQuestionList = ({ survey, ...props }) => {
  const handleDeleteQuestion = question => {
    props.deleteQuestionFromDraftSurvey(question);
  };

  const handleQuestionChange = (question, value) => {
    const newQuestion = { ...question };
    newQuestion.value = value;
    props.updateQuestionInDraftSurvey(newQuestion);
  };

  return (
    <Segment.Group>
      {survey.questions
        ? survey.questions.map((question, i) => (
            <DraftQuestion
              value={question.value}
              key={i}
              onDelete={() => handleDeleteQuestion(question)}
              onChange={(e, { value }) => handleQuestionChange(question, value)}
            />
          ))
        : null}

      <AddQuestionForm />
    </Segment.Group>
  );
};

const mapStateToProps = state => ({
  survey: state.surveys.draft
});

export default connect(
  mapStateToProps,
  {
    deleteQuestionFromDraftSurvey,
    updateQuestionInDraftSurvey
  }
)(DraftQuestionList);
