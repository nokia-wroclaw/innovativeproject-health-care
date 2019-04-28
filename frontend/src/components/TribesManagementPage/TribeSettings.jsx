import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Container, Input } from "semantic-ui-react";
import {
  deleteTribe,
  addEditorToTribe,
  deleteEditorFromTribe,
  addTeamToTribe,
  deleteTeamFromTribe,
  updateTribeName
} from "./../../store/actions/tribes";
import { confirmDelete } from "./../common/functions";
import EditingCard from "./../common/EditingCard/EditingCard";
import "../../styles/common.css";

const TribeSettings = ({ isOpen, tribe_id, close, ...props }) => {
  const tribe = props.tribes.find(tribe => tribe.id === tribe_id);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  const [newTribeName, setNewTribeName] = useState(tribe.name);

  const handleDeleteTribe = () => {
    if (confirmDelete()) {
      setDeleteBtnLoading(true);
      props.deleteTribe(tribe.id);
    }
  };

  const handleAddEditorToTribe = user => props.addEditorToTribe(tribe.id, user);

  const handleDeleteEditorFromTribe = user =>
    props.deleteEditorFromTribe(tribe.id, user);

  const handleAddTeamToTribe = team_name =>
    props.addTeamToTribe(tribe.id, team_name);

  const handleDeleteTeamFromTribe = team =>
    props.deleteTeamFromTribe(tribe.id, team);

  const handleSaveAndClose = async () => {
    setSaveBtnLoading(true);
    if (newTribeName !== tribe.name)
      await props.updateTribeName(tribe.id, newTribeName);
    setSaveBtnLoading(false);
    close();
  };

  return (
    <Modal open={isOpen}>
      <Modal.Header>
        <Input
          label={{ icon: "edit" }}
          labelPosition="right corner"
          defaultValue={tribe.name}
          onChange={({ target }) => setNewTribeName(target.value)}
        />
        <Button
          icon="trash alternate"
          labelPosition="left"
          floated="right"
          content="Detele Tribe"
          basic
          negative
          onClick={handleDeleteTribe}
          loading={deleteBtnLoading}
        />
      </Modal.Header>

      <Modal.Content>
        <Container textAlign="left">
          <div className="flex-space-evenly-align-start">
            <EditingCard
              data={tribe.editors}
              title="Tribe editors"
              useUsersForm={true}
              onAddBtnClick={handleAddEditorToTribe}
              onItemDelete={handleDeleteEditorFromTribe}
            />
            <EditingCard
              data={tribe.teams}
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
    deleteTeamFromTribe,
    updateTribeName
  }
)(TribeSettings);
