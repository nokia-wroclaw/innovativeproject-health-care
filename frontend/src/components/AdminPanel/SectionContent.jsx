import React from "react";
import { Card, Grid } from "semantic-ui-react";
import colors from "../../styles/colors";

const SectionContent = ({ text, onDelete }) => {
  return (
    <Card.Content>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={13} floated="left">
            {text}
          </Grid.Column>
          <Grid.Column width={3} floated="right" textAlign="center">
            <i
              className="fa fa-minus-circle"
              aria-hidden="true"
              style={{
                fontSize: "1.3em",
                cursor: "pointer",
                color: colors.red
              }}
              onClick={onDelete}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  );
};

export default SectionContent;
