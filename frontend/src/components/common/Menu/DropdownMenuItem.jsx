import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setMenuOption } from "../../../store/actions/user";
import { Dropdown } from "semantic-ui-react";

const DropdownMenuItem = ({ option, active, setMenuOption }) => {
  return (
    <Dropdown.Item
      as={Link}
      to={option.path}
      active={active.path === option.path}
      onClick={() => setMenuOption(option)}
    >
      {option.name}
    </Dropdown.Item>
  );
};

const mapStateToProps = state => ({
  active: state.user.activeOption || {}
});

export default connect(
  mapStateToProps,
  { setMenuOption }
)(DropdownMenuItem);
