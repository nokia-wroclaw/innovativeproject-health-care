import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";

const editors = ["John Smith", "Amy Potato"];

class Section extends Component {
  render() {
    return (
      <Card style={{ margin: "10px" }}>
        <SectionHeader title={this.props.title} onAdd={this.props.onAdd} />
        {editors.map((editor, i) => (
          <SectionContent
            key={i}
            text={editor}
            onDelete={this.props.onDelete}
          />
        ))}
      </Card>
    );
  }
}

export default Section;
