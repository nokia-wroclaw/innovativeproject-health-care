import React from "react";
import { Button, Item, Icon, Popup, Form } from "semantic-ui-react";
import "../../styles/common.css";

const AddTribePopup = () => {
  return (
    <Popup
      trigger={
        <Button icon labelPosition="left" floated="right" compact secondary>
          <Icon name="plus" />
          New tribe
        </Button>
      }
      content={
        <Form onSubmit={() => {}}>
          <Form.Field>
            <input placeholder="Tribe name" />
          </Form.Field>

          <Button type="submit" floated="right">
            Add
          </Button>
        </Form>
      }
      on="click"
      position="bottom center"
    />
  );
};

export default AddTribePopup;
