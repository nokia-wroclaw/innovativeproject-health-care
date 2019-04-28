import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Item, Label, Accordion } from "semantic-ui-react";
import { setTribeEditors, setTeamsInTribe } from "../../store/actions/tribes";
import TeamDetails from "./TeamDetails";
import TribeSettings from "./TribeSettings";
import "./style.css";

const TribeDetails = ({ id, editors, teams, ...props }) => {
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  useEffect(() => {
    props.setTribeEditors(id);
    props.setTeamsInTribe(id);
  }, []);

  let teamPanels = [];
  try {
    teamPanels = [
      ...teams.map(team => {
        const details = (
          <TeamDetails
            id={team.id}
            tribe_id={id}
            managers={team.managers}
            members={team.members}
          />
        );
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
        onClick={() => setIsOpenSettings(true)}
      />
      <TribeSettings
        isOpen={isOpenSettings}
        tribe_id={id}
        close={() => setIsOpenSettings(false)}
      />
      <Item style={{ paddingTop: "1em" }}>
        Editors ({editors ? editors.length : 0}): <br />
        {editors
          ? editors.map(editor => (
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

export default connect(
  null,
  { setTribeEditors, setTeamsInTribe }
)(TribeDetails);
