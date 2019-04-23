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

  const rootPanels = [
    ...props.tribes.map(tribe => {
      const details = <TribeDetails id={tribe.id} />;
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
        <Accordion fluid styled panels={rootPanels} exclusive={false} />
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
