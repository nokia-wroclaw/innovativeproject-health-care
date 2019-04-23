import React, { useEffect } from "react";
import { Button, Item, Label, Icon, List, Segment } from "semantic-ui-react";
import SectionIcon from "./../common/SectionIcon/index";
import colors from "../../styles/colors";
import "../../styles/common.css";

const TeamDetails = ({ id }) => {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Item>
        <Button
          content="rename team"
          icon="edit"
          labelPosition="right"
          compact
          secondary
        />
      </Item>
      <Item style={{ paddingTop: "1em" }}>
        <b>Managers: </b>

        <Label>
          Paweł Komorowski (pawel)
          <Icon name="delete" />
        </Label>
        <Label>
          Bazyli Cyran (sajran)
          <Icon name="delete" />
        </Label>
        <Label color="blue">
          <Icon name="plus" />
          add manager
        </Label>
      </Item>

      <Segment>
        <List divided verticalAlign="middle">
          <List.Item>
            <List.Content floated="right">
              <SectionIcon className="fa fa-plus-circle" onClick={() => {}} />
            </List.Content>
            <List.Content>
              <List.Header>Members</List.Header>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content floated="right">
              <SectionIcon
                className="fa fa-minus-square-o"
                color={colors.red}
                onClick={() => {}}
              />
            </List.Content>

            <List.Content>Bazyli Cyran (sajran)</List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated="right">
              <SectionIcon
                className="fa fa-minus-square-o"
                color={colors.red}
                onClick={() => {}}
              />
            </List.Content>

            <List.Content>Paweł Komorowski (pawel)</List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated="right">
              <SectionIcon
                className="fa fa-minus-square-o"
                color={colors.red}
                onClick={() => {}}
              />
            </List.Content>

            <List.Content>Agata Toczyńska (agata)</List.Content>
          </List.Item>
        </List>
      </Segment>
    </React.Fragment>
  );
};

export default TeamDetails;
