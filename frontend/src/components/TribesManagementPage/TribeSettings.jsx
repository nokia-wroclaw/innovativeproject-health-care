import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Container } from "semantic-ui-react";
import {
  deleteTribe,
  addEditorToTribe,
  deleteEditorFromTribe
} from "./../../store/actions/tribes";
import { confirmDelete } from "./../common/functions";
import EditingCard from "./../common/EditingCard/EditingCard";
import "../../styles/common.css";

const TribeSettings = ({ open, setOpen, tribe_id, close, ...props }) => {
  const tribe = props.tribes.find(tribe => tribe.id === tribe_id);
  const [loading, setLoading] = useState(false);

  const handleDeleteTribe = () => {
    if (confirmDelete()) {
      setLoading(true);
      props.deleteTribe(tribe_id).then(() => {
        setLoading(false);
        setOpen(false);
      });
    }
  };

  const handleAddEditorToTribe = user => {
    props.addEditorToTribe(tribe_id, user);
  };

  const handleDeleteEditorFromTribe = user => {
    props.deleteEditorFromTribe(tribe_id, user);
  };

  return (
    <Modal open={open}>
      <Modal.Header>
        <input defaultValue={tribe.name} />
        <Button
          icon="trash alternate"
          labelPosition="left"
          floated="right"
          content="Detele Tribe"
          basic
          negative
          onClick={handleDeleteTribe}
          loading={loading}
        />
      </Modal.Header>

      <Modal.Content>
        <Container textAlign="left">
          <div className="flex-space-evenly-align-start">
            <EditingCard
              data={tribe.editors}
              title="Tribe editors"
              onAddBtnClick={handleAddEditorToTribe}
              onItemDelete={handleDeleteEditorFromTribe}
            />
            <EditingCard
              data={tribe.teams}
              title="Teams"
              onAddBtnClick={() => {}}
              onItemDelete={() => {}}
            />
          </div>
        </Container>
        <Container textAlign="center">
          <Button onClick={close} primary>
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
  { deleteTribe, addEditorToTribe, deleteEditorFromTribe }
)(TribeSettings);
