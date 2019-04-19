import React from "react";
import { Card, Input, Button, Form } from "semantic-ui-react";

const AddEditorForm = ({
  onAddButtonClick,
  onInputChange,
  dataListRef,
  usersDataList,
  addButtonDisadbed
}) => {
  return (
    <Card.Content>
      <Form onSubmit={onAddButtonClick}>
        <Form.Field>
          <Input
            type="text"
            placeholder="Search..."
            action
            onChange={onInputChange}
            list="editorsList"
          >
            <input />
            <datalist id="editorsList" ref={dataListRef}>
              {usersDataList.map(user => (
                <option
                  value={`${user.name} (${user.login})`}
                  key={user.id}
                  userid={user.id}
                />
              ))}
            </datalist>
            <Button type="submit" color="violet" disabled={addButtonDisadbed}>
              Add
            </Button>
          </Input>
        </Form.Field>
      </Form>
    </Card.Content>
  );
};

export default AddEditorForm;
