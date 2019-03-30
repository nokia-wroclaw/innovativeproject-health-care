import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Header from "../Header";
import "../../styles/common.css";
import Section from "./Section";

class AdminPanel extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Container className="flex-center">
          <Section
            title="Editors"
            onAdd={() => console.log("on add")}
            onDelete={() => console.log("on delete")}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default AdminPanel;
