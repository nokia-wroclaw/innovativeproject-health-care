import React, { useState } from "react";
import { Header, Card, Grid } from "semantic-ui-react";
import SectionIcon from "../common/SectionIcon/";
import AddEditorForm from "./AddEditorForm";

export const EditorsSectionHeader = () => {
  const [showInput, setShowInput] = useState(false);
  return (
    <React.Fragment>
      <Card.Content>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={13} floated="left">
              <Header as="h4">Editors</Header>
            </Grid.Column>
            <Grid.Column width={3} floated="right" textAlign="center">
              <SectionIcon
                className={
                  showInput ? "fa fa-chevron-circle-up" : "fa fa-plus-circle"
                }
                onClick={() => setShowInput(!showInput)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>

      {showInput && <AddEditorForm />}
    </React.Fragment>
  );
};

export default EditorsSectionHeader;
