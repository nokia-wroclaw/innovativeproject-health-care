import React from "react";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";
import LoginForm from "../LoginForm";

const LoginModal = ({ open }) => {
  return (
    <Modal open={open}>
      <Modal.Header>Please, confirm your identity</Modal.Header>
      <Modal.Content>
        <LoginForm reload={true} />
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = state => ({
  open: state.general.openLoginModal
});

export default connect(mapStateToProps)(LoginModal);
