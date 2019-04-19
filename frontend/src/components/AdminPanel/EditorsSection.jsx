import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import EditorsSectionHeader from "./EditorsSectionHeader";
import EditorsSectionContent from "./EditorsSectionContent";
import { setEditors } from "./../../store/actions/editors";
import { connect } from "react-redux";

export class EditorsSection extends Component {
  componentWillMount() {
    this.props.setEditors();
  }

  render() {
    const { editors } = this.props;
    return (
      <React.Fragment>
        <Card style={{ margin: "10px" }} className="editors-section-card">
          <EditorsSectionHeader className="editors-section-header" />
          {editors.map(editor => (
            <EditorsSectionContent key={editor.id} editor={editor} />
          ))}
        </Card>
      </React.Fragment>
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
