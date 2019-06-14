import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Header as SemanticHeader,
  Segment,
  Container
} from "semantic-ui-react";
import * as colors from "../../../styles/colors";
import LoginButton from "./LoginButton";
import UserDisplayName from "./UserDisplayName";
import Menu from "../Menu";
import LogoutButton from "./LogoutButton";

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <Segment
          inverted
          vertical
          color={colors.header}
          padded="very"
          style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)" }}
        >
          <Container>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column mobile={16} tablet={10} computer={10}>
                  <SemanticHeader size="huge" textAlign="left" inverted>
                    Squad Health Care
                  </SemanticHeader>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={6} computer={6}>
                  {user ? (
                    <Container textAlign="right">
                      <UserDisplayName />
                      <LogoutButton />
                    </Container>
                  ) : (
                    <LoginButton />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        {user ? <Menu /> : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.userData
});

export default connect(mapStateToProps)(Header);
