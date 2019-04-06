import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Card, Grid, Input, Button, Form } from "semantic-ui-react";
import { getUsersByName } from "../../services/inputHints";
import { addEditor } from "../../store/actions/editors";
import SectionIcon from "./../common/SectionIcon";

class EditorsSectionHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
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

  handleChange = async ({ currentTarget: input }) => {
    const inputValue = input.value;
    await this.setState({ inputValue });

    if (inputValue.length === 4) {
      getUsersByName(inputValue).then(({ data }) =>
        this.setState({ dataList: data })
      );
    }
    this.validateInput();
  };

  onAdd = () => {
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
      <React.Fragment>
        <Card.Content>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column width={13} floated="left">
                <Header as="h4">Editors</Header>
              </Grid.Column>
              <Grid.Column width={3} floated="right" textAlign="center">
                <SectionIcon
                  className={
                    this.state.showInput
                      ? "fa fa-chevron-circle-up"
                      : "fa fa-plus-circle"
                  }
                  onClick={() =>
                    this.setState({ showInput: !this.state.showInput })
                  }
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>

        {this.state.showInput && (
          <Card.Content>
            <Form onSubmit={this.onAdd}>
              <Form.Field>
                <Input
                  type="text"
                  placeholder="Search..."
                  action
                  onChange={this.handleChange}
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
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { addEditor }
)(EditorsSectionHeader);
