import React from "react";
import { Card, Grid, Icon } from "semantic-ui-react";
import { confirmDialog } from "./../functions";
import { red } from "../../../styles/colors";

export const EditingCardContent = ({ item, onDelete, alertMsg }) => {
  const handleDelete = item => {
    if (confirmDialog(item.name, alertMsg)) onDelete(item);
  };

  return (
    <Card.Content>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={13} floated="left">
            {item.name}
          </Grid.Column>
          <Grid.Column width={3} floated="right" textAlign="center">
            <Icon
              name="minus square outline"
              onClick={() => handleDelete(item)}
              color={red}
              link
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  );
};

export default EditingCardContent;
