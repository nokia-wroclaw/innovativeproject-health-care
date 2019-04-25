import React from "react";
import { connect } from "react-redux";
import { Modal, Button } from "semantic-ui-react";

const TribeSettings = ({ open, tribe_id, close, ...props }) => {
  const tribe = props.tribes.find(tribe => tribe.id === tribe_id);
  return (
    <Modal open={open}>
      <Modal.Header>{tribe.name}</Modal.Header>
      <Modal.Content>settings...</Modal.Content>
      <Button onClick={close}>Close</Button>
    </Modal>
  );
};

const mapStateToProps = state => ({
  tribes: state.tribes
});

export default connect(mapStateToProps)(TribeSettings);
