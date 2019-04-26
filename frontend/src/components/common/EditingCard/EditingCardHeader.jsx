import React, { useState } from "react";
import { Header, Card, Grid, Icon } from "semantic-ui-react";
import FormWithUsersDataList from "../../common/FormWithUsersDataList/";

export const EditingCardHeader = ({ title, onAddBtnClick }) => {
  const [showInput, setShowInput] = useState(false);
  return (
    <React.Fragment>
      <Card.Content>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={13} floated="left">
              <Header as="h4">{title}</Header>
            </Grid.Column>
            <Grid.Column width={3} floated="right" textAlign="center">
              <Icon
                name={showInput ? "chevron up" : "plus"}
                link
                onClick={() => setShowInput(!showInput)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>

      {showInput && (
        <Card.Content>
          <FormWithUsersDataList buttonText="Add" handleClick={onAddBtnClick} />
        </Card.Content>
      )}
    </React.Fragment>
  );
};

export default EditingCardHeader;
