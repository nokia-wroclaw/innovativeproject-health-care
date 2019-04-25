import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Item, Label, Accordion } from "semantic-ui-react";
import { setTribeEditors, setTribeTeams } from "../../store/actions/tribes";
import TeamDetails from "./TeamDetails";
import "./style.css";

const TribeDetails = ({ id, editors, teams, ...props }) => {
  useEffect(() => {
    props.setTribeEditors(id);
    props.setTribeTeams(id);
  }, []);

  let teamPanels = [];
  try {
    teamPanels = [
      ...teams.map(team => {
        const details = (
          <TeamDetails
            id={team.id}
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
      <Item style={{ paddingTop: "1em" }}>
        Teams ({teamPanels.length}):
        <Accordion.Accordion
          className="teams-accordion"
          panels={teamPanels}
          exclusive={false}
        />
      </Item>
    </React.Fragment>
  );
};

export default connect(
  null,
  { setTribeEditors, setTribeTeams }
)(TribeDetails);
