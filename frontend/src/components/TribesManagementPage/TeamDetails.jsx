import React, { useEffect } from "react";
import { Button, Item, Label, Icon, List, Segment } from "semantic-ui-react";
import "../../styles/common.css";

const TeamDetails = ({ id }) => {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Button
        content="Team settings"
        icon="cogs"
        labelPosition="left"
        compact
        secondary
        basic
      />
      <Item style={{ paddingTop: "1em" }}>
        Managers:
        <br /> <Label color="blue">Paweł Komorowski (pawel)</Label>
        <Label color="blue">Bazyli Cyran (sajran)</Label>
      </Item>

      <List verticalAlign="middle" size="large">
        <List.Header>Members:</List.Header>
        <List.Item>
          <List.Icon name="user circle" />
          Bazyli Cyran (sajran)
        </List.Item>
        <List.Item>
          <List.Icon name="user circle" />
          Paweł Komorowski (pawel)
        </List.Item>
        <List.Item>
          <List.Icon name="user circle" />
          Agata Toczyńska (agata)
        </List.Item>
      </List>
    </React.Fragment>
  );
};

export default TeamDetails;
