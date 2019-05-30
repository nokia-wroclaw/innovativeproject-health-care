import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Dropdown } from "semantic-ui-react";
import { setSurveys } from "./../../store/actions/surveys";
import TemplatePage from "../common/TemplatePage/";
import SurveysTab from "./SurveysTab";
import { setUserEditingDetails } from "../../store/actions/user";

const EditSurveyPage = ({ user, editing, ...props }) => {
  const [currentTribeId, setCurrentTribeId] = useState(undefined);

  useEffect(() => {
    if (editing[0]) handleTribeSelect(null, { value: editing[0].id });
  }, [editing]);

  useEffect(() => {
    props.setUserEditingDetails(user);
  }, []);

  const handleTribeSelect = (e, { value }) => {
    if (value === currentTribeId) return;
    setCurrentTribeId(value);
    props.setSurveys(value);
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
        {currentTribeId ? (
          <SurveysTab tribeId={currentTribeId} />
        ) : (
          <p>Please, select tribe</p>
        )}
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData,
  editing: state.user.userData.editing
});

export default connect(
  mapStateToProps,
  { setUserEditingDetails, setSurveys }
)(EditSurveyPage);
