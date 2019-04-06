import React, { Component } from "react";
import { Header, Card, Grid, Input, Button } from "semantic-ui-react";
import SectionIcon from "../common/SectionIcon";

class SectionHeader extends Component {
  state = {
    showInput: false,
    inputValue: "",
    dataList: ["abcd", "efghij"]
  };

  handleChange = ({ currentTarget: input }) => {
    const inputValue = input.value;
    this.setState({ inputValue });

    // if (inputValue.length = 2) call backend to get data list...
    // this.setState({dataList: ...})

    // if (inputValue.length > 2) {
    // const {dataList} = this.state;
    // dataList.filter(user => user.name.startsWith(inputValue));
    // this.setState({dataList});
    //}
  };

  render() {
    const { title, onAdd, onEdit } = this.props;
    return (
      <React.Fragment>
        <Card.Content>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column width={10} floated="left">
                <Header as="h4">{title}</Header>
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
