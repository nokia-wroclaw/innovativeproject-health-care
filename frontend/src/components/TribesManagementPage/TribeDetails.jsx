import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Item, Label, Accordion, Loader } from 'semantic-ui-react';
import { setTribeEditors, setTeamsInTribe } from '../../store/actions/tribes';
import TeamDetails from './TeamDetails';
import TribeSettings from './TribeSettings';
import './style.css';

const TribeDetails = ({ tribe, ...props }) => {
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadTribeDetails = async () => {
    await props.setTribeEditors(tribe);
    await props.setTeamsInTribe(tribe);
  };

  useEffect(() => {
    loadTribeDetails().then(() => setIsLoading(false));
  }, []);

  let teamPanels = [];
  try {
    teamPanels = [
      ...tribe.teams.map(team => {
        const details = <TeamDetails team={team} />;
        return {
          key: team.id,
          title: team.name,
          content: { content: details }
        };
      })
    ];
  } catch {}

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader active inline='centered' />
      ) : (
        <React.Fragment>
          <Button
            content='Tribe settings'
            icon='cogs'
            labelPosition='left'
            compact
            secondary
            basic
            onClick={() => setIsOpenSettings(true)}
          />
          <TribeSettings
            isOpen={isOpenSettings}
            tribe={tribe}
            close={() => setIsOpenSettings(false)}
          />
          <Item style={{ paddingTop: '1em' }}>
            Editors ({tribe.editors ? tribe.editors.length : 0}): <br />
            {tribe.editors
              ? tribe.editors.map(editor => (
                  <Label color='violet' key={editor.id}>
                    {editor.name}
                    <Label.Detail>({editor.login})</Label.Detail>
                  </Label>
                ))
              : null}
          </Item>
          {teamPanels.length ? (
            <Item style={{ paddingTop: '1em' }}>
              Teams ({teamPanels.length}):
              <Accordion.Accordion
                className='teams-accordion'
                panels={teamPanels}
                exclusive={false}
              />
            </Item>
          ) : null}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  tribes: state.tribes
});

export default connect(
  mapStateToProps,
  { setTribeEditors, setTeamsInTribe }
)(TribeDetails);
