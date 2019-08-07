import React, { useState } from "react";
import { Button, Item, Label, Accordion } from "semantic-ui-react";
import TeamDetails from "./TeamDetails";
import TribeSettings from "./TribeSettings";
import "./style.css";

const TribeDetails = ({ tribe }) => {
  const [openSettings, setOpenSettings] = useState(false);

  let teamPanels = [];
  try {
    const activeTeams = tribe.teams.filter(team => team.deleted === false);
    teamPanels = [
      ...activeTeams.map(team => {
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
      <Button
        content="Tribe settings"
        icon="cogs"
        labelPosition="left"
        compact
        secondary
        basic
        onClick={() => setOpenSettings(true)}
      />
      <TribeSettings
        isOpen={openSettings}
        tribe={tribe}
        close={() => setOpenSettings(false)}
      />
      <Item style={{ paddingTop: "1em" }}>
        Editors ({tribe.editors ? tribe.editors.length : 0}): <br />
        {tribe.editors
          ? tribe.editors.map(editor => (
              <Label color="violet" key={editor.id}>
                {editor.name}
                <Label.Detail>({editor.login})</Label.Detail>
              </Label>
            ))
          : null}
      </Item>
      {teamPanels.length ? (
        <Item style={{ paddingTop: "1em" }}>
          Teams ({teamPanels.length}):
          <Accordion.Accordion
            className="teams-accordion"
            panels={teamPanels}
            exclusive={false}
          />
        </Item>
      ) : null}
    </React.Fragment>
  );
};

export default TribeDetails;
