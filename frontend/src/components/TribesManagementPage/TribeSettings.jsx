import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Container, Input, Grid } from "semantic-ui-react";
import {
  deleteTribe,
  addEditorToTribe,
  deleteEditorFromTribe,
  addTeamToTribe,
  updateTribeName
} from "./../../store/actions/tribes";
import { deleteTeam, restoreTeamToTribe } from "../../store/actions/teams";
import { revalidateUser } from "../../store/actions/user";
import { confirmDialog } from "./../common/functions";
import EditingCard from "./../common/EditingCard/EditingCard";
import RestoreTeam from "./RestoreTeam";
import "../../styles/common.css";

const TribeSettings = ({ isOpen, tribe, close, ...props }) => {
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  const [newTribeName, setNewTribeName] = useState(tribe.name);
  const [openRestoreTeam, setOpenRestoreTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  const activeTeams = tribe.teams.filter(team => team.deleted === false);
  
  const handleDeleteTribe = () => {
    if (confirmDialog(tribe.name)) {
      setDeleteBtnLoading(true);
      props.deleteTribe(tribe);
    }
  };

  const handleAddEditorToTribe = user =>
  props.revalidateUser(user, props.addEditorToTribe(tribe, user));
  
  const handleDeleteEditorFromTribe = user =>
  props.revalidateUser(user, props.deleteEditorFromTribe(tribe, user));
  
  const handleAddTeamToTribe = async (teamName) => {
    const teamsNames = [...tribe.teams.map(team => team.name)];
    const activeTeamsNames = [...activeTeams.map(team => team.name)];
    
    if (activeTeamsNames.includes(teamName)) {
      alert("Can't create team. Team with this name already exists.");
    }
    else if (!teamsNames.includes(teamName)) {
      await props.addTeamToTribe(tribe, teamName);
    }
    else {
      setNewTeamName(teamName);
      setOpenRestoreTeam(true);
    }
  };

  const handleDeleteTeamFromTribe = team => props.deleteTeam(team);

  const handleSaveAndClose = async () => {
    setSaveBtnLoading(true);
    if (newTribeName !== tribe.name)
      await props.updateTribeName(tribe, newTribeName);
    setSaveBtnLoading(false);
    close();
  };

  return (
    <Modal open={isOpen} onClose={close}>
      <Modal.Header>
        <Grid stackable>
          <Grid.Column width={8}>
            <Input
              label={{ icon: "edit" }}
              labelPosition="right corner"
              defaultValue={tribe.name}
              onChange={({ target }) => setNewTribeName(target.value)}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Button
              icon="trash alternate"
              labelPosition="left"
              floated="right"
              content="Delete Tribe"
              basic
              negative
              onClick={handleDeleteTribe}
              loading={deleteBtnLoading}
            />
          </Grid.Column>
        </Grid>
      </Modal.Header>

      <Modal.Content>
        <RestoreTeam
          isOpen={openRestoreTeam}
          tribe={tribe}
          teamName={newTeamName}
          close={() => setOpenRestoreTeam(false)}
        />
        <Container textAlign="left">
          <div className="flex-space-evenly-align-start">
            <EditingCard
              data={tribe.editors ? tribe.editors : []}
              title="Tribe editors"
              useUsersForm={true}
              onlyEditors={true}
              onAddBtnClick={handleAddEditorToTribe}
              onItemDelete={handleDeleteEditorFromTribe}
            />
            <EditingCard
              data={activeTeams ? activeTeams : []}
              title="Teams"
              onAddBtnClick={handleAddTeamToTribe}
              onItemDelete={handleDeleteTeamFromTribe}
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

export default connect(
  null,
  {
    deleteTribe,
    addEditorToTribe,
    deleteEditorFromTribe,
    addTeamToTribe,
    deleteTeam,
    updateTribeName,
    revalidateUser,
    restoreTeamToTribe
  }
)(TribeSettings);
