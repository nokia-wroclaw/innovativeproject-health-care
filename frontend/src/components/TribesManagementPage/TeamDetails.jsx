import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Item, Label, List } from "semantic-ui-react";
import { setTeamMembers, setTeamManagers } from "./../../store/actions/tribes";
import "../../styles/common.css";

const TeamDetails = ({ id, tribe_id, managers, members, ...props }) => {
  useEffect(() => {
    props.setTeamManagers(tribe_id, id);
    props.setTeamMembers(tribe_id, id);
  }, []);

  return (
    <React.Fragment>
      <Button
        content="Team settings"
        icon="cog"
        labelPosition="left"
        compact
        secondary
        basic
      />
      <Item style={{ paddingTop: "1em" }}>
        Managers ({managers ? managers.length : 0}):
        <br />
        {managers
          ? managers.map(manager => (
              <Label color="blue" key={manager.id}>
                {manager.name}
                <Label.Detail>({manager.login})</Label.Detail>
              </Label>
            ))
          : null}
      </Item>

      <List verticalAlign="middle" size="large">
        <List.Header>Members ({members ? members.length : 0}):</List.Header>

        {members
          ? members.map(member => (
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

export default connect(
  null,
  { setTeamMembers, setTeamManagers }
)(TeamDetails);
