import React, { Component } from "react";
import {
  Container,
  Grid,
  Segment,
  Header as SemanticHeader,
  List,
  SegmentGroup
} from "semantic-ui-react";
import Header from "../Header";
import ListSegment from "./ListSegment";

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
              <ListSegment
                title="Tribes"
                items={["tribe 0", "tribe 1", "tribe 3"]}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <ListSegment title="Teams" items={Object.keys(tribes[1])} />
            </Grid.Column>
            <Grid.Column width={5}>
              <ListSegment title="Users" items={tribes[1].team2} />
            </Grid.Column>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default UsersManagementPage;
