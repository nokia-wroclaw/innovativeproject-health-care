import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Accordion, Container, Header, Item } from "semantic-ui-react";
import TemplatePage from "../common/TemplatePage/";
import { setTribes } from "./../../store/actions/tribes";
import TribeDetails from "./TribeDetails";
import AddTribePopup from "./AddTribePopup";

const TribesManagementPage = props => {
  useEffect(() => {
    props.setTribes();
  }, []);

  const tribePanels = [
    ...props.tribes.map(tribe => {
      const details = (
        <TribeDetails
          tribe={tribe}
          teams={tribe.teams}
          editors={tribe.editors}
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
      <Container>
        <Item style={{ margin: "1em 0" }}>
          <AddTribePopup />
          <Header as="h3">Your tribes</Header>
        </Item>
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
