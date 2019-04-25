import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Input, Button, Form } from "semantic-ui-react";
import { getUsersByName } from "../../services/inputHints";
import { addEditor } from "../../store/actions/editors";
import { openLoginModal } from "./../../store/actions/general";

const lettersCountForFetchingUsers = 4;

class AddEditorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      dataList: [],
      addButtonDisadbed: true,
      userId: ""
    };
    this.editorsListRef = React.createRef();
  }

  validateInput = () => {
    const allOptions = [...this.editorsListRef.current.children];
    const option = allOptions.filter(
      ({ value }) => value === this.state.inputValue
    );
    if (option.length) {
      const userId = [...option[0].attributes].find(
        ({ name }) => name === "userid"
      ).value;
      this.setState({ userId, addButtonDisadbed: false });
    } else this.setState({ addButtonDisadbed: true });
  };

  handleInputChange = async ({ currentTarget: input }) => {
    const inputValue = input.value;
    await this.setState({ inputValue });

    if (inputValue.length === lettersCountForFetchingUsers) {
      getUsersByName(inputValue)
        .then(({ data }) => this.setState({ dataList: data }))
        .catch(() => {
          this.props.openLoginModal();
        });
    }
    this.validateInput();
  };

  handleAddButtonClick = () => {
    const editor = this.state.dataList.find(
      user => `${user.id}` === `${this.state.userId}`
    );
    if (editor) {
      this.props.addEditor(editor);
      this.setState({ inputValue: "" });
    }
  };

  render() {
    return (
      <Card.Content>
        <Form onSubmit={this.handleAddButtonClick}>
          <Form.Field>
            <Input
              type="text"
              placeholder="Search..."
              action
              onChange={this.handleInputChange}
              list="editorsList"
            >
              <input />
              <datalist id="editorsList" ref={this.editorsListRef}>
                {this.state.dataList.map(user => (
                  <option
                    value={`${user.name} (${user.login})`}
                    key={user.id}
                    userid={user.id}
                  />
                ))}
              </datalist>
              <Button
                type="submit"
                color="violet"
                disabled={this.state.addButtonDisadbed}
              >
                Add
              </Button>
            </Input>
          </Form.Field>
        </Form>
      </Card.Content>
    );
  }
}

export default connect(
  null,
  { addEditor, openLoginModal }
)(AddEditorForm);
