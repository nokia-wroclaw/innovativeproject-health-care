import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../store/actions/user";
import { Popup } from "semantic-ui-react";

const LogoutButton = ({ logout }) => {
  return (
    <Popup
      trigger={
        <Link to="/">
          <i
            className="fa fa-sign-out"
            aria-hidden="true"
            style={{ fontSize: 20, cursor: "pointer", color: "white" }}
            onClick={logout}
          />
        </Link>
      }
      content="Logout"
      position="bottom right"
    />
  );
};

export default connect(
  null,
  { logout }
)(LogoutButton);
