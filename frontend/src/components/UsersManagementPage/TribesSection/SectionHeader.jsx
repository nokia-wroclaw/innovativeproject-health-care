import React, { Component } from "react";
import { Header, Card, Grid, Input, Button, Form } from "semantic-ui-react";
import SectionIcon from "../../common/SectionIcon/";

class SectionHeader extends Component {
  state = {
    showInput: false,
    inputValue: "",
    addButtonDisadbed: true
  };

  handleChange = ({ currentTarget: input }) => {
    const inputValue = input.value;
    this.setState({ inputValue });
    if (inputValue.length) this.setState({ addButtonDisadbed: false });
    else this.setState({ addButtonDisadbed: true });
  };

  render() {
    const { onEdit } = this.props;
    return (
      <React.Fragment>
        <Card.Content>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column width={10} floated="left">
                <Header as="h4">Tribes</Header>
              </Grid.Column>
              <Grid.Column width={5} floated="right" textAlign="right">
                <SectionIcon className="fa fa-pencil" onClick={onEdit} />
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
            <Form onSubmit={() => {}}>
              <Form.Field style={{ width: "70%" }}>
                <Input
                  type="text"
                  placeholder="Tribe name..."
                  action
                  onChange={this.handleChange}
                >
                  <input />
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

export default SectionHeader;
