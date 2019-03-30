import React from "react";
import { Header, Card, Grid } from "semantic-ui-react";

const SectionHeader = ({ title, onAdd }) => {
  return (
    <Card.Content>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={13} floated="left">
            <Header as="h4">{title}</Header>
          </Grid.Column>
          <Grid.Column width={3} floated="right" textAlign="center">
            <i
              className="fa fa-plus"
              aria-hidden="true"
              style={{ fontSize: "1.3em", cursor: "pointer" }}
              onClick={onAdd}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  );
};

export default SectionHeader;
