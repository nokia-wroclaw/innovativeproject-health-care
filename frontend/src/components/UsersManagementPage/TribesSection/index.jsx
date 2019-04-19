import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";

class TribesSection extends Component {
  state = {
    showMinus: false
  };
  render() {
    return (
      <Card style={{ margin: "10px" }}>
        <SectionHeader
          onEdit={() =>
            this.setState({
              showMinus: !this.state.showMinus
            })
          }
        />
        {this.props.data.map((tribe, i) => (
          <SectionContent
            key={i}
            tribe={tribe}
            showMinus={this.state.showMinus}
          />
        ))}
      </Card>
    );
  }
}

export default TribesSection;
