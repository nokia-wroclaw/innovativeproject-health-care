import React from "react";
import { Card, Grid } from "semantic-ui-react";
import colors from "../../../styles/colors";
import SectionIcon from "../../common/SectionIcon/";

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
            <SectionIcon
              className="fa fa-minus-square-o"
              color={colors.red}
              onClick={() => handleDelete(item)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  );
};

export default EditingCardContent;
