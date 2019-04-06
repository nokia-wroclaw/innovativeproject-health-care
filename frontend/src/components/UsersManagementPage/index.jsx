import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import Header from "../Header";
import dummyData from "./dummyData";
import TribesSection from "./TribesSection";
import TeamsSection from "./TeamsSection";
import UsersSection from "./UsersSection";

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
        <Container style={{ width: "90%" }}>
          <Grid stackable>
            <Grid.Column width={5}>
              <TribesSection
                title="Tribes"
                // data={[...dummyData.map(item => item.name)]}
                data={[]}
                onAdd={() => console.log("on add")}
                onDelete={() => console.log("on delete")}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <TeamsSection
                title="Teams"
                // data={Object.keys(tribes[1])}
                data={[]}
                onAdd={() => console.log("on add")}
                onDelete={() => console.log("on delete")}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <UsersSection
                title="Users"
                // data={tribes[1].team2}
                data={[]}
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
