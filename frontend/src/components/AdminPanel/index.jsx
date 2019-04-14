import React from "react";
import { Container } from "semantic-ui-react";
import "../../styles/common.css";
import EditorsSection from "./EditorsSection";
import TemplatePage from "../common/TemplatePage/";

const AdminPanel = () => {
  return (
    <TemplatePage>
      <Container className="flex-center">
        <EditorsSection />
      </Container>
    </TemplatePage>
  );
};

export default AdminPanel;
