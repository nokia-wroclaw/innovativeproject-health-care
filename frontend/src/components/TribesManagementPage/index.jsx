import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Accordion, Container } from "semantic-ui-react";
import TemplatePage from "../common/TemplatePage/";
import { setTribes } from "./../../store/actions/tribes";

const TribesManagementPage = props => {
  useEffect(() => {
    props.setTribes();
  }, []);

  const rootPanels = [
    ...props.tribes.map(tribe => ({
      key: tribe.id,
      title: tribe.name,
      content: "hello"
    }))
  ];

  return (
    <TemplatePage>
      <Container>
        <Accordion
          fluid
          styled
          panels={rootPanels}
          exclusive={false}
          style={{ marginTop: "1em" }}
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
