import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Container } from "semantic-ui-react";
import {
  setDraftSurveyPeriod,
  saveDraftSurvey,
  saveAndPublishDraftSurvey
} from "../../../store/actions/surveys";
import PeriodSelect from "./PeriodSelect";
import DraftQuestionList from "./DraftQuestionList";
import { confirmDialog } from "../../common/functions";

const confirmMessage = "Are you sure you want to publish this survey?";
const successMessage = "Your survey has been successfully published!";

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
    if (!confirmDialog(null, confirmMessage)) return;
    setPublishing(true);
    props.saveAndPublishDraftSurvey(tribeId, survey).then(() => {
      setPublishing(false);
      alert(successMessage);
    });
  };

  return (
    <React.Fragment>
      <PeriodSelect value={survey.period_len} onChange={handlePeriodSelect} />
      <DraftQuestionList />
      <Container textAlign="center">
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
    setDraftSurveyPeriod,
    saveDraftSurvey,
    saveAndPublishDraftSurvey
  }
)(DraftSurvey);
