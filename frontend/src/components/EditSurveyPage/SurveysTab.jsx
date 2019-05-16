import React from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import ActiveSurvey from './ActiveSurvey';
import DraftSurvey from './DraftSurvey/';
import PendingSurvey from './PendingSurvey';
import Loader from './../common/Loader/';

const SurveysTab = ({ tribeId, surveys }) => {
  const panes = [
    {
      menuItem: 'Active survey',
      render: () => (
        <Tab.Pane>
          {surveys.active.isLoading ? <Loader /> : <ActiveSurvey />}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Pending survey',
      render: () => (
        <Tab.Pane>
          {surveys.next.isLoading ? <Loader /> : <PendingSurvey />}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Draft',
      render: () => (
        <Tab.Pane>
          {surveys.draft.isLoading ? (
            <Loader />
          ) : (
            <DraftSurvey tribeId={tribeId} />
          )}
        </Tab.Pane>
      )
    }
  ];

  return <Tab panes={panes} />;
};

const mapStateToProps = state => ({
  surveys: state.surveys
});

export default connect(mapStateToProps)(SurveysTab);
