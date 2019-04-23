import React, { useEffect } from "react";
import { Button, Item, Label, Icon, Accordion } from "semantic-ui-react";
import TeamDetails from "./TeamDetails";

const TribeDetails = ({ id }) => {
  useEffect(() => {}, []);

  const details = <TeamDetails />;
  const teams = [
    { key: "team 1", title: "team 1", content: { content: details } },
    { key: "team 2", title: "team 2", content: { content: details } }
  ];
  return (
    <React.Fragment>
      <Item>
        <Button
          content="rename tribe"
          icon="edit"
          labelPosition="right"
          compact
          secondary
        />
        <Button
          content="new team"
          icon="plus circle"
          labelPosition="right"
          compact
          primary
        />
      </Item>

      <Item style={{ paddingTop: "1em" }}>
        <b>Editors: </b>
        <Label>
          Agata Toczyńska (agata)
          <Icon name="delete" />
        </Label>
        <Label>
          Paweł Komorowski (pawel)
          <Icon name="delete" />
        </Label>
        <Label color="blue">
          <Icon name="plus" />
          add editor
        </Label>
      </Item>
      <Item style={{ paddingTop: "1em" }}>
        <b>Teams: </b>
        <Accordion.Accordion panels={teams} exclusive={false} />
      </Item>
    </React.Fragment>
  );
};

export default TribeDetails;
