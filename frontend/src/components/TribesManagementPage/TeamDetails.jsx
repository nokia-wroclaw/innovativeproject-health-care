import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Item, Label, List, Loader } from 'semantic-ui-react';
import { setTeamMembers, setTeamManagers } from './../../store/actions/teams';
import TeamSettings from './TeamSettings';
import '../../styles/common.css';

export const TeamDetails = ({ team, ...props }) => {
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadTeamDetails = async () => {
    await props.setTeamManagers(team);
    await props.setTeamMembers(team);
  };

  useEffect(() => {
    loadTeamDetails().then(() => setIsLoading(false));
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader active inline='centered' />
      ) : (
        <React.Fragment>
          <Button
            content='Team settings'
            icon='cog'
            labelPosition='left'
            compact
            secondary
            basic
            onClick={() => setIsOpenSettings(true)}
          />
          <TeamSettings
            isOpen={isOpenSettings}
            team={team}
            close={() => setIsOpenSettings(false)}
          />
          <Item style={{ paddingTop: '1em' }}>
            Managers ({team.managers ? team.managers.length : 0}):
            <br />
            {team.managers
              ? team.managers.map(manager => (
                  <Label color='blue' key={manager.id}>
                    {manager.name}
                    <Label.Detail>({manager.login})</Label.Detail>
                  </Label>
                ))
              : null}
          </Item>

          <List verticalAlign='middle'>
            <List.Header>
              Members ({team.members ? team.members.length : 0}):
            </List.Header>

            {team.members
              ? team.members.map(member => (
                  <List.Item key={member.id}>
                    <List.Icon name='user circle' />
                    {member.name} ({member.login})
                  </List.Item>
                ))
              : null}
          </List>
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
  { setTeamMembers, setTeamManagers }
)(TeamDetails);
