import React from "react";
import { Card, Grid, Icon } from "semantic-ui-react";

export const EditingCardContent = ({ item, onDelete, alertMsg }) => {
  const defaultMsg = `Are you sure you want to remove ${item.name}?`;
  const msg = alertMsg || defaultMsg;

  const handleDelete = item => {
    if (window.confirm(msg)) onDelete(item);
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
              color="red"
              link
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  );
};

export default EditingCardContent;
