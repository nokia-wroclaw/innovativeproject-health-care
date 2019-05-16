import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import DraftQuestion from './DraftQuestion';
import AddQuestionForm from './AddQuestionForm';
import { updateDraftSurvey } from './../../../store/actions/surveys';

const SortableItem = sortableElement(({ question }) => (
  <li style={{ listStyle: 'none' }}>
    <DraftQuestion question={question} />
  </li>
));

const SortableContainer = sortableContainer(({ children }) => (
  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{children}</ul>
));

const DraftQuestionList = ({ survey, ...props }) => {
  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const sortedSurvey = { ...survey };
    sortedSurvey.questions = arrayMove(
      sortedSurvey.questions,
      oldIndex,
      newIndex
    );
    sortedSurvey.questions = sortedSurvey.questions.map((question, index) => ({
      ...question,
      order: index + 1
    }));
    props.updateDraftSurvey(sortedSurvey);
  };

  return (
    <Segment.Group>
      <SortableContainer onSortEnd={handleSortEnd} useDragHandle>
        {survey.questions
          ? survey.questions.map((question, index) => (
              <SortableItem question={question} key={index} index={index} />
            ))
          : null}
      </SortableContainer>
      <AddQuestionForm />
    </Segment.Group>
  );
};

const mapStateToProps = state => ({
  survey: state.surveys.draft
});

export default connect(
  mapStateToProps,
  { updateDraftSurvey }
)(DraftQuestionList);
