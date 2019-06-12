import React, { useState } from "react";
import { Header, Card, Grid, Icon } from "semantic-ui-react";
import FormWithUsersDataList from "../../common/FormWithUsersDataList/";
import FormWithSingleInput from "../FormWithSingleInput";

export const EditingCardHeader = ({ title, useUsersForm, onlyEditors, onAddBtnClick }) => {
  const [showInput, setShowInput] = useState(false);
  const form = useUsersForm ? (
    <FormWithUsersDataList onlyEditors={onlyEditors} buttonText="Add" handleClick={onAddBtnClick} />
  ) : (
    <FormWithSingleInput buttonText="Add" handleClick={onAddBtnClick} />
  );
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

      {showInput && <Card.Content>{form}</Card.Content>}
    </React.Fragment>
  );
};

export default EditingCardHeader;
