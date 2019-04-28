import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Container, Input } from "semantic-ui-react";
import {
  deleteTeam
  //   addManagerToTeam,
  //   deleteManagerFromTeam,
  //   addMemberToTeam,
  //   deleteMemberFromTeam,
  //   updateTeamName
} from "./../../store/actions/tribes";
import { confirmDelete } from "./../common/functions";
import EditingCard from "./../common/EditingCard/EditingCard";
import "../../styles/common.css";

const TeamSettings = ({ isOpen, tribe_id, team_id, close, ...props }) => {
  const targetTribe = props.tribes.find(tribe => tribe.id === tribe_id);
  const team = targetTribe.teams.find(team => team.id === team_id);

  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  const [newTeamName, setNewTeamName] = useState(team.name);

  const handleDeleteTribe = () => {
    if (confirmDelete()) {
      setDeleteBtnLoading(true);
      props.deleteTeam(team.id);
    }
  };

  //   const handleAddEditorToTribe = user => props.addManagerToTeam(team.id, user);

  //   const handleDeleteEditorFromTribe = user =>
  //     props.deleteManagerFromTeam(team.id, user);

  //   const handleAddTeamToTribe = team_name =>
  //     props.addMemberToTeam(team.id, team_name);

  //   const handleDeleteTeamFromTribe = team =>
  //     props.deleteMemberFromTeam(team.id, team);

  const handleSaveAndClose = async () => {
    //   setSaveBtnLoading(true);
    //   if (newTeamName !== team.name)
    //     await props.updateTeamName(team.id, newTeamName);
    //   setSaveBtnLoading(false);
    close();
  };

  return (
    <Modal open={isOpen}>
      <Modal.Header>
        <Input
          label={{ icon: "edit" }}
          labelPosition="right corner"
          defaultValue={team.name}
          onChange={({ target }) => setNewTeamName(target.value)}
        />
        <Button
          icon="trash alternate"
          labelPosition="left"
          floated="right"
          content="Detele Tribe"
          basic
          negative
          //   onClick={handleDeleteTribe}
          loading={deleteBtnLoading}
        />
      </Modal.Header>

      <Modal.Content>
        <Container textAlign="left">
          <div className="flex-space-evenly-align-start">
            <EditingCard
              data={team.managers}
              title="Managers"
              useUsersForm={true}
              //   onAddBtnClick={handleAddEditorToTribe}
              //   onItemDelete={handleDeleteEditorFromTribe}
            />
            <EditingCard
              data={team.members}
              title="Members"
              useUsersForm={true}
              //   onAddBtnClick={handleAddTeamToTribe}
              //   onItemDelete={handleDeleteTeamFromTribe}
            />
          </div>
        </Container>
        <Container textAlign="center">
          <Button onClick={handleSaveAndClose} primary loading={saveBtnLoading}>
            Save and close
          </Button>
        </Container>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = state => ({
  tribes: state.tribes
});

export default connect(
  mapStateToProps,
  {
    deleteTeam
    // addManagerToTeam,
    // deleteManagerFromTeam,
    // addMemberToTeam,
    // deleteMemberFromTeam,
    // updateTeamName
  }
)(TeamSettings);
