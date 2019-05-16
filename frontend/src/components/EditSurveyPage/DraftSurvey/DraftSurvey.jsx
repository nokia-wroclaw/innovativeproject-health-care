import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container } from 'semantic-ui-react';
import {
  addQuestionToDraftSurvey,
  deleteQuestionFromDraftSurvey,
  updateQuestionInDraftSurvey,
  setDraftSurveyPeriod,
  saveDraftSurvey,
  saveAndPublishDraftSurvey
} from '../../../store/actions/surveys';
import PeriodSelect from './PeriodSelect';
import DraftQuestionList from './DraftQuestionList';

const DraftSurvey = ({ tribeId, survey, ...props }) => {
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handlePeriodSelect = (e, { value }) => {
    props.setDraftSurveyPeriod(value);
  };

  const handleSaveDraft = () => {
    setSaving(true);
    props.saveDraftSurvey(tribeId, survey).then(() => setSaving(false));
  };

  const handleSaveAndPublish = () => {
    setPublishing(true);
    props
      .saveAndPublishDraftSurvey(tribeId, survey)
      .then(() => setPublishing(false));
  };

  return (
    <React.Fragment>
      <PeriodSelect value={survey.period_len} onChange={handlePeriodSelect} />
      <DraftQuestionList />
      <Container textAlign='center'>
        <Button.Group>
          <Button onClick={handleSaveDraft} loading={saving}>
            Save draft
          </Button>
          <Button.Or />
          <Button primary onClick={handleSaveAndPublish} loading={publishing}>
            Publish
          </Button>
        </Button.Group>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  survey: state.surveys.draft
});

export default connect(
  mapStateToProps,
  {
    addQuestionToDraftSurvey,
    deleteQuestionFromDraftSurvey,
    updateQuestionInDraftSurvey,
    setDraftSurveyPeriod,
    saveDraftSurvey,
    saveAndPublishDraftSurvey
  }
)(DraftSurvey);