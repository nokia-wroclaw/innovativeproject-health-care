import React, { useState } from "react";
import { Button, Item, Label, List } from "semantic-ui-react";
import TeamSettings from "./TeamSettings";
import "../../styles/common.css";

export const TeamDetails = ({ team }) => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <React.Fragment>
      <Button
        content="Team settings"
        icon="cog"
        labelPosition="left"
        compact
        secondary
        basic
        onClick={() => setOpenSettings(true)}
      />
      <TeamSettings
        isOpen={openSettings}
        team={team}
        close={() => setOpenSettings(false)}
      />
      <Item style={{ paddingTop: "1em" }}>
        Managers ({team.managers ? team.managers.length : 0}):
        <br />
        {team.managers
          ? team.managers.map(manager => (
              <Label color="blue" key={manager.id}>
                {manager.name}
                <Label.Detail>({manager.login})</Label.Detail>
              </Label>
            ))
          : null}
      </Item>

      <List verticalAlign="middle">
        <List.Header>
          Members ({team.members ? team.members.length : 0}):
        </List.Header>

        {team.members
          ? team.members.map(member => (
              <List.Item key={member.id}>
                <List.Icon name="user circle" />
                {member.name} ({member.login})
              </List.Item>
            ))
          : null}
      </List>
    </React.Fragment>
  );
};

export default TeamDetails;
