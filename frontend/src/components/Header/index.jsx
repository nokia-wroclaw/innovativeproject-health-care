import React from "react";
import {
  Grid,
  Header as SemanticHeader,
  Segment,
  Container
} from "semantic-ui-react";
import colors from "../../styles/colors";
import LoginButton from "./LoginButton";
import UserDisplayName from "./UserDisplayName";
import Menu from "./Menu";

//user should be read from store - if (user === null) -> user is not logged in
const user = null;

const Header = () => {
  return (
    <React.Fragment>
      <Segment inverted vertical color={colors.header} padded="very">
        <Container>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={13} computer={13}>
                <SemanticHeader size="huge" textAlign="left" inverted>
                  Squad health check
                </SemanticHeader>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={3} computer={3}>
                {user ? <UserDisplayName /> : <LoginButton />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
      {user ? <Menu /> : null}
    </React.Fragment>
  );
};

export default Header;
