import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import "../../styles/common.css";
import EditorsSection from "./EditorsSection";
import TemplatePage from "../common/TemplatePage/";

class AdminPanel extends Component {
  render() {
    return (
      <TemplatePage>
        <Container className="flex-center">
          <EditorsSection />
        </Container>
      </TemplatePage>
    );
  }
}

export default AdminPanel;
