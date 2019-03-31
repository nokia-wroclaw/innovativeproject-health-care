import React, { Component } from "react";
import { Header, Card, Grid, Input, Button } from "semantic-ui-react";

class SectionHeader extends Component {
  state = {
    showInput: false,
    inputValue: "",
    dataList: ["abcd", "efghij"]
  };

  handleChange = ({ currentTarget: input }) => {
    const inputValue = input.value;
    this.setState({ inputValue });

    // if (inputValue.length > 5) call backend to get data list...
    // this.setState({dataList: ...})
  };

  render() {
    const { title, onAdd } = this.props;
    return (
      <React.Fragment>
        <Card.Content>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column width={13} floated="left">
                <Header as="h4">{title}</Header>
              </Grid.Column>
              <Grid.Column width={3} floated="right" textAlign="center">
                <i
                  className={
                    this.state.showInput
                      ? "fa fa-chevron-circle-up"
                      : "fa fa-plus-circle"
                  }
                  aria-hidden="true"
                  style={{ fontSize: "1.3em", cursor: "pointer" }}
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
            <Input
              type="text"
              placeholder="Search..."
              action
              onChange={this.handleChange}
              list="sectionItems"
            >
              <input />
              <datalist id="sectionItems">
                {this.state.dataList.map((option, i) => (
                  <option value={option} key={i} />
                ))}
              </datalist>
              <Button onClick={onAdd} color="violet">
                Add
              </Button>
            </Input>
          </Card.Content>
        )}
      </React.Fragment>
    );
  }
}

export default SectionHeader;
