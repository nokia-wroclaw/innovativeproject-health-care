import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Dropdown, Message } from "semantic-ui-react";
import { setSurveys } from "./../../store/actions/surveys";
import TemplatePage from "../common/TemplatePage/";
import SurveysTab from "./SurveysTab";
import { setUserEditingDetails } from "../../store/actions/user";
import Loader from "../common/Loader";

const EditSurveyPage = ({ user, editing, ...props }) => {
  const [currentTribeId, setCurrentTribeId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    props.setUserEditingDetails(user).then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (editing[0]) handleTribeSelect(null, { value: editing[0].id });
    else setCurrentTribeId(undefined);
  }, [editing]);

  const handleTribeSelect = (e, { value }) => {
    if (value === currentTribeId) return;
    setIsLoading(true);
    setCurrentTribeId(value);
    props.setSurveys(value).then(() => setIsLoading(false));
  };

  const getContent = () => {
    if (!isLoading && currentTribeId)
      return <SurveysTab tribeId={currentTribeId} />;
    else if (isLoading || editing.length)
      return <Loader active inline="centered" />;
    return (
      <Message>
        You need to be assigned as editor to a tribe to define surveys.
      </Message>
    );
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder="Select tribe"
          options={editing.map((tribe, i) => ({
            key: i,
            text: tribe.name,
            value: tribe.id
          }))}
          selection
          onChange={handleTribeSelect}
          value={currentTribeId}
        />
        <br />
        <br />
        {getContent()}
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  editing: state.user.editing || []
});

export default connect(
  mapStateToProps,
  { setUserEditingDetails, setSurveys }
)(EditSurveyPage);
