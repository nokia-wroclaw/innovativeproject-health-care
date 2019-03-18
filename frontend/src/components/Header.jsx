import React from "react";
import {
  Grid,
  Header,
  Button,
  Segment,
  Container,
  Popup
} from "semantic-ui-react";
import LoginForm from "./LoginForm";

const PageHeader = () => {
  return (
    <Segment inverted vertical color="blue" padded="very">
      <Container>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={13} computer={13}>
              <Header size="huge" textAlign="left" inverted>
                Squad health check
              </Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={3} computer={3}>
              <Popup
                trigger={
                  <Button
                    content="login"
                    inverted
                    color="grey"
                    floated="right"
                  />
                }
                content={<LoginForm />}
                on="click"
                position="bottom right"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default PageHeader;
