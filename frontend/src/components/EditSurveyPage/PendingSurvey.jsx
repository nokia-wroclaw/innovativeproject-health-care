import React from "react";
import { connect } from "react-redux";
import QuestionList from "./QuestionList";
import { deleteSurvey } from "../../store/actions/surveys";
import { Button, Container, Message } from "semantic-ui-react";
import { confirmDialog } from "./../common/functions";

const PendingSurvey = ({ survey, ...props }) => {
  const handleDelete = () => {
    if (confirmDialog("pending survey")) props.deleteSurvey(survey);
  };

  const content = survey.id ? (
    <React.Fragment>
      <Message>
        This version of survey will become active on <b>{survey.date}</b>. Until
        then you can still delete it or overwrite by publishing a draft.
      </Message>
      <QuestionList survey={survey} />
      <Container textAlign="center">
        <Button
          icon="trash alternate"
          labelPosition="left"
          content="Delete pending survey"
          negative
          onClick={handleDelete}
        />
      </Container>
    </React.Fragment>
  ) : (
    <Message info>There is no pending survey for this tribe.</Message>
  );
  return content;
};

const mapStateToProps = state => ({
  survey: state.surveys.next
});

export default connect(
  mapStateToProps,
  {
    deleteSurvey
  }
)(PendingSurvey);
