import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu as SemanticMenu, Sticky } from "semantic-ui-react";
import colors from "../../styles/colors";

class Menu extends Component {
  state = {
    activeItem: this.props.menu[0].name
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Sticky>
        <SemanticMenu
          inverted
          stackable
          pointing
          secondary
          color={colors.menu}
          style={{ margin: 0 }}
        >
          {this.props.menu.map(option => (
            <SemanticMenu.Item
              as={Link}
              to={option.path}
              key={option.name}
              name={option.name}
              active={activeItem === option.name}
              onClick={this.handleItemClick}
            />
          ))}
        </SemanticMenu>
      </Sticky>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.user.menu
});

export default connect(mapStateToProps)(Menu);
