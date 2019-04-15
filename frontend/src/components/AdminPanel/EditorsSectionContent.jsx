import React from "react";
import { connect } from "react-redux";
import { deleteEditor } from "./../../store/actions/editors";
import { Card, Grid } from "semantic-ui-react";
import colors from "../../styles/colors";
import SectionIcon from "../common/SectionIcon/";

const EditorsSectionContent = props => {
  return (
    <Card.Content>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={13} floated="left">
            {props.editor.name}
          </Grid.Column>
          <Grid.Column width={3} floated="right" textAlign="center">
            <SectionIcon
              className="fa fa-minus-square-o"
              color={colors.red}
              onClick={() => props.deleteEditor(props.editor)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  );
};

export default connect(
  null,
  { deleteEditor }
)(EditorsSectionContent);
