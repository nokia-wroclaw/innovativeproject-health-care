import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import Header from "../Header";
import Section from "./Section";

const tribes = [
  {
    team0: ["User One", "User Two", "User Three", "User Four"],
    team1: ["User One", "User Two", "User Three", "User Four", "User Five"]
  },
  {
    team0: ["User One", "User Two", "User Three", "User Four"],
    team1: ["User One", "User Two", "User Three", "User Four", "User Five"],
    team2: [
      "User One",
      "User Two",
      "User Three",
      "User Four",
      "User Five",
      "User Six"
    ]
  }
];

class UsersManagementPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <Grid>
            <Grid.Column width={5}>
              <Section
                title="Tribes"
                data={["tribe 0", "tirbe 1"]}
                onAdd={() => console.log("on add")}
                onDelete={() => console.log("on delete")}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Section
                title="Teams"
                data={Object.keys(tribes[1])}
                onAdd={() => console.log("on add")}
                onDelete={() => console.log("on delete")}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Section
                title="Users"
                data={tribes[1].team2}
                onAdd={() => console.log("on add")}
                onDelete={() => console.log("on delete")}
              />
            </Grid.Column>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default UsersManagementPage;
