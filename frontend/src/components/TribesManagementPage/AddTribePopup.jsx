import React from "react";
import { Button, Icon, Popup } from "semantic-ui-react";
import "../../styles/common.css";
import AddTribeForm from "./AddTribeForm";

export const AddTribePopup = () => {
  return (
    <Popup
      trigger={
        <Button icon labelPosition="left" floated="right" compact secondary>
          <Icon name="plus" />
          New tribe
        </Button>
      }
      content={<AddTribeForm />}
      on="click"
      position="bottom center"
    />
  );
};

export default AddTribePopup;
