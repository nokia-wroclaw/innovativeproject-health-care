import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../store/actions/";
import { Popup } from "semantic-ui-react";
import colors from "../../styles/colors";

class LogoutButton extends Component {
  handleClick = () => {
    localStorage.removeItem("jwt");
    this.props.logoutUser();
  };

  render() {
    return (
      <Popup
        trigger={
          <Link to="/">
            <i
              className="fa fa-sign-out"
              aria-hidden="true"
              style={{ fontSize: 20, cursor: "pointer", color: "white" }}
              onClick={this.handleClick}
            />
          </Link>
        }
        content="Logout"
        position="bottom right"
      />
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(LogoutButton);
