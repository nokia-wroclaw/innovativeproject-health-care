import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/user";
import { Popup, Icon } from "semantic-ui-react";

const LogoutButton = ({ logout }) => {
  return (
    <Popup
      trigger={
        <Link to="/">
          <Icon name="log out" link onClick={logout} inverted size="large" />
        </Link>
      }
      content="Log out"
      position="bottom right"
    />
  );
};

export default connect(
  null,
  { logout }
)(LogoutButton);
