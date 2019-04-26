import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Container } from "semantic-ui-react";
import EditingCard from "./../common/EditingCard/EditingCard";
import "../../styles/common.css";

const TribeSettings = ({ open, tribe_id, close, ...props }) => {
  const tribe = props.tribes.find(tribe => tribe.id === tribe_id);
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
        />
      </Modal.Header>

      <Modal.Content>
        <Container textAlign="center">
          <div className="flex-space-evenly-align-start">
            <EditingCard
              data={tribe.editors}
              title="Editors"
              onAddBtnClick={() => {}}
              onItemDelete={() => {}}
            />
            <EditingCard
              data={tribe.teams}
              title="Teams"
              onAddBtnClick={() => {}}
              onItemDelete={() => {}}
            />
          </div>
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

export default connect(mapStateToProps)(TribeSettings);
