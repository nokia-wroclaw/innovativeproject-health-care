import React from "react";
import { Grid, Header, Segment, Container } from "semantic-ui-react";
import colors from "../../styles/colors";

const Footer = () => {
  return (
    <Segment
      secondary
      color={colors.footer}
      className="footer"
      padded
      style={{ borderRadius: 0 }}
    >
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column floated="left">
              <Header as="h4">Nokia Innovative Project 2019</Header>
            </Grid.Column>
            <Grid.Column floated="right">
              <Header as="h4" textAlign="right">
                Bazyli Cyran | Agata Toczyńska | Paweł Komorowski
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
