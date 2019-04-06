import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";

class TeamsSection extends Component {
  state = {
    showMinus: false
  };
  render() {
    return (
      <Card style={{ margin: "10px" }}>
        <SectionHeader
          title={this.props.title}
          onAdd={this.props.onAdd}
          onEdit={() =>
            this.setState({
              showMinus: !this.state.showMinus
            })
          }
        />
        {this.props.data.map((editor, i) => (
          <SectionContent
            key={i}
            text={editor}
            onDelete={this.props.onDelete}
            showMinus={this.state.showMinus}
          />
        ))}
      </Card>
    );
  }
}

export default TeamsSection;
