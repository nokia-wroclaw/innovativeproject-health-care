import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Accordion, Container, Header } from "semantic-ui-react";
import TemplatePage from "../common/TemplatePage/";
import { setTribes } from "./../../store/actions/tribes";
import TribeDetails from "./TribeDetails";

const TribesManagementPage = props => {
  useEffect(() => {
    props.setTribes();
  }, []);

  const tribePanels = [
    ...props.tribes.map(tribe => {
      const details = (
        <TribeDetails
          id={tribe.id}
          editors={tribe.editors}
          teams={tribe.teams}
        />
      );
      return {
        key: tribe.id,
        title: tribe.name,
        content: { content: details }
      };
    })
  ];

  return (
    <TemplatePage>
      <Container style={{ marginTop: "1em" }}>
        <Header as="h3">Your tribes</Header>
        <Accordion
          className="tribes-accordion"
          fluid
          styled
          panels={tribePanels}
          exclusive={false}
        />
      </Container>
    </TemplatePage>
  );
};

const mapStateToProps = state => ({
  tribes: state.tribes
});

export default connect(
  mapStateToProps,
  { setTribes }
)(TribesManagementPage);
