import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Container, Input } from "semantic-ui-react";
import {
  deleteTeam,
  addManagerToTeam,
  deleteManagerFromTeam,
  addMemberToTeam,
  deleteMemberFromTeam,
  updateTeamName
} from "./../../store/actions/teams";
import { confirmDelete } from "./../common/functions";
import EditingCard from "./../common/EditingCard/EditingCard";
import "../../styles/common.css";

const TeamSettings = ({ isOpen, team, close, ...props }) => {
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  const [newTeamName, setNewTeamName] = useState(team.name);

  const handleDeleteTeam = () => {
    if (confirmDelete()) {
      setDeleteBtnLoading(true);
      props.deleteTeam(team);
    }
  };

  const handleAddManagerToTeam = user => props.addManagerToTeam(team, user);

  const handleDeleteManagerFromTeam = user =>
    props.deleteManagerFromTeam(team, user);

  const handleAddMemberToTeam = user => props.addMemberToTeam(team, user);

  const handleDeleteMemberFromTeam = user =>
    props.deleteMemberFromTeam(team, user);

  const handleSaveAndClose = async () => {
    setSaveBtnLoading(true);
    if (newTeamName !== team.name)
      await props.updateTeamName(team, newTeamName);
    setSaveBtnLoading(false);
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
          content="Detele Team"
          basic
          negative
          onClick={handleDeleteTeam}
          loading={deleteBtnLoading}
        />
      </Modal.Header>

      <Modal.Content>
        <Container textAlign="left">
          <div className="flex-space-evenly-align-start">
            <EditingCard
              data={team.managers ? team.managers : []}
              title="Managers"
              useUsersForm={true}
              onAddBtnClick={handleAddManagerToTeam}
              onItemDelete={handleDeleteManagerFromTeam}
            />
            <EditingCard
              data={team.members ? team.members : []}
              title="Members"
              useUsersForm={true}
              onAddBtnClick={handleAddMemberToTeam}
              onItemDelete={handleDeleteMemberFromTeam}
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
    deleteTeam,
    addManagerToTeam,
    deleteManagerFromTeam,
    addMemberToTeam,
    deleteMemberFromTeam,
    updateTeamName
  }
)(TeamSettings);
