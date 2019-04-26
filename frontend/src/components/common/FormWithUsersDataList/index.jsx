import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Form } from "semantic-ui-react";
import { getUsersByName } from "../../../services/inputHints";
import { openLoginModal } from "./../../../store/actions/general";

const lettersCountForFetchingUsers = 4;

//props: buttonText, handleClick
class FormWithUsersDataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      dataList: [],
      addButtonDisadbed: true,
      userId: ""
    };
    this.dataListRef = React.createRef();
  }

  validateInput = () => {
    const allOptions = [...this.dataListRef.current.children];
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

  handleInputChange = async ({ target: input }) => {
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
    const user = this.state.dataList.find(
      user => `${user.id}` === `${this.state.userId}`
    );
    if (user) {
      this.props.handleClick(user);
      this.setState({ inputValue: "" });
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleAddButtonClick}>
        <Form.Field>
          <Input
            type="text"
            placeholder="Search..."
            action
            onChange={this.handleInputChange}
            list="usersDataList"
          >
            <input />
            <datalist id="usersDataList" ref={this.dataListRef}>
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
              {this.props.buttonText}
            </Button>
          </Input>
        </Form.Field>
      </Form>
    );
  }
}

export default connect(
  null,
  { openLoginModal }
)(FormWithUsersDataList);