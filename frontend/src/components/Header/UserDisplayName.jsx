import React from "react";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";

const UserDisplayName = ({ user }) => {
  return (
    <Header size="medium" inverted>
      {user.name}
    </Header>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData
});

export default connect(mapStateToProps)(UserDisplayName);
