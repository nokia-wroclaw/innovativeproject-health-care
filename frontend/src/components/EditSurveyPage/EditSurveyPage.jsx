import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Dropdown } from 'semantic-ui-react';
import { setTribes } from './../../store/actions/tribes';
import { setSurveys } from './../../store/actions/surveys';
import TemplatePage from '../common/TemplatePage/';
import SurveysTab from './SurveysTab';

const EditSurveyPage = props => {
  const [currentTribeId, setCurrentTribeId] = useState(undefined);

  useEffect(() => {
    if (!props.tribes.length) props.setTribes();
  }, []);

  const handleTribeSelect = (e, { value }) => {
    setCurrentTribeId(value);
    props.setSurveys(value);
  };

  return (
    <TemplatePage>
      <Container>
        <br />
        <Dropdown
          placeholder='Select tribe'
          options={props.tribes.map(tribe => ({
            key: tribe.id,
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
  tribes: state.tribes
});

export default connect(
  mapStateToProps,
  { setTribes, setSurveys }
)(EditSurveyPage);
