import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import EditorsSectionHeader from "./EditorsSectionHeader";
import EditorsSectionContent from "./EditorsSectionContent";
import { setEditors } from "./../../store/actions/editors";
import { connect } from "react-redux";

class EditorsSection extends Component {
  componentWillMount() {
    this.props.setEditors();
  }

  render() {
    const { editors } = this.props;
    return (
      <Card style={{ margin: "10px" }}>
        <EditorsSectionHeader />
        {editors.map(editor => (
          <EditorsSectionContent key={editor.id} editor={editor} />
        ))}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  editors: state.editors
});

export default connect(
  mapStateToProps,
  { setEditors }
)(EditorsSection);
