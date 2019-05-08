import React from 'react';
import TemplatePage from '../common/TemplatePage/';
import { Tab, Container, Select } from 'semantic-ui-react';
import ActiveSurvey from './ActiveSurvey';
import DraftSurvey from './DraftSurvey';
import PendingSurvey from './PendingSurvey';

const EditSurveyPage = () => {
  const panes = [
    {
      menuItem: 'Active survey',
      render: () => (
        <Tab.Pane>
          <ActiveSurvey />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Pending survey',
      render: () => (
        <Tab.Pane>
          <PendingSurvey />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Draft',
      render: () => (
        <Tab.Pane>
          <DraftSurvey />
        </Tab.Pane>
      )
    }
  ];
  return (
    <TemplatePage>
      <Container>
        <br />
        <Select
          placeholder='Select tribe'
          options={[
            { key: 1, text: 'tribe 1', value: '1' },
            { key: 2, text: 'tribe 2', value: '2' }
          ]}
        />
        <br />
        <br />
        <Tab panes={panes} />
      </Container>
    </TemplatePage>
  );
};

export default EditSurveyPage;
