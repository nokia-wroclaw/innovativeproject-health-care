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

const TribeSettings = ({ isOpen, tribe, close, ...props }) => {
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  const [newTribeName, setNewTribeName] = useState(tribe.name);

  const handleDeleteTribe = () => {
    if (confirmDelete()) {
      setDeleteBtnLoading(true);
      props.deleteTribe(tribe);
    }
  };

  const handleAddEditorToTribe = user => props.addEditorToTribe(tribe, user);

  const handleDeleteEditorFromTribe = user =>
    props.deleteEditorFromTribe(tribe, user);

  const handleAddTeamToTribe = teamName =>
    props.addTeamToTribe(tribe, teamName);

  const handleDeleteTeamFromTribe = team => props.deleteTeamFromTribe(team);

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
    deleteTeamFromTribe,
    updateTribeName
  }
)(TribeSettings);
