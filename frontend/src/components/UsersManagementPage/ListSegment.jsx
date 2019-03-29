import React, { Component } from "react";
import {
  Segment,
  Header as SemanticHeader,
  List,
  SegmentGroup
} from "semantic-ui-react";

class ListSegment extends Component {
  render() {
    const { title, items } = this.props;
    return (
      <SegmentGroup>
        <Segment>
          <SemanticHeader>{title}</SemanticHeader>
        </Segment>
        <Segment attached>
          <List>
            {items.map((item, i) => (
              <List.Item key={i}>{item}</List.Item>
            ))}
          </List>
        </Segment>
      </SegmentGroup>
    );
  }
}

export default ListSegment;
