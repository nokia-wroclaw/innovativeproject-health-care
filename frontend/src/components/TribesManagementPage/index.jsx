import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Accordion,
  Container,
  Header,
  Button,
  Item,
  Icon,
  Popup
} from "semantic-ui-react";
import TemplatePage from "../common/TemplatePage/";
import { setTribes, addTribe } from "./../../store/actions/tribes";
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
      <Container>
        <Item style={{ margin: "1em 0" }}>
          <Popup
            trigger={
              <Button
                icon
                labelPosition="left"
                floated="right"
                compact
                secondary
              >
                <Icon name="plus" />
                New tribe
              </Button>
            }
            content={<input />}
            on="click"
            position="bottom center"
          />
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
  { setTribes, addTribe }
)(TribesManagementPage);
