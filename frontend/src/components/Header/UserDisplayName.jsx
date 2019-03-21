import React from "react";
import { Header } from "semantic-ui-react";

const UserDisplayName = () => {
  return (
    <React.Fragment>
      <Header size="medium" textAlign="right" style={{ margin: 0 }} inverted>
        Jan Kowalski
      </Header>
      <Header size="small" textAlign="right" style={{ margin: 0 }} inverted>
        admin
      </Header>
    </React.Fragment>
  );
};

export default UserDisplayName;
