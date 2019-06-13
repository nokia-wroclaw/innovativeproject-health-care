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
import { deleteTeam } from "../../store/actions/teams";
import { confirmDialog } from "./../common/functions";
import EditingCard from "./../common/EditingCard/EditingCard";
import "../../styles/common.css";

const TribeSettings = ({ isOpen, tribe, close, ...props }) => {
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  const [newTribeName, setNewTribeName] = useState(tribe.name);

  const handleDeleteTribe = () => {
    if (confirmDialog(tribe.name)) {
      setDeleteBtnLoading(true);
      props.deleteTribe(tribe);
    }
  };

  const handleAddEditorToTribe = user => props.addEditorToTribe(tribe, user);

  const handleDeleteEditorFromTribe = user =>
    props.deleteEditorFromTribe(tribe, user);

  const handleAddTeamToTribe = teamName =>
    props.addTeamToTribe(tribe, teamName);

  const handleDeleteTeamFromTribe = team => props.deleteTeam(team);

  const handleSaveAndClose = async () => {
    setSaveBtnLoading(true);
    if (newTribeName !== tribe.name)
      await props.updateTribeName(tribe, newTribeName);
    setSaveBtnLoading(false);
    close();
  };

  return (
    <Modal open={isOpen}>
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
        <Container textAlign="left">
          <div className="flex-space-evenly-align-start">
            <EditingCard
              data={tribe.editors ? tribe.editors : []}
              title="Tribe editors"
              useUsersForm={true}
              onAddBtnClick={handleAddEditorToTribe}
              onItemDelete={handleDeleteEditorFromTribe}
            />
            <EditingCard
              data={tribe.teams ? tribe.teams : []}
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

const mapStateToProps = state => ({
  tribes: state.tribes
});

export default connect(
  mapStateToProps,
  {
    deleteTribe,
    addEditorToTribe,
    deleteEditorFromTribe,
    addTeamToTribe,
    deleteTeam,
    updateTribeName
  }
)(TribeSettings);
