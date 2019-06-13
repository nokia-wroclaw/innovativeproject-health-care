import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setMenuOption } from "../../../store/actions/user";
import { Menu } from "semantic-ui-react";

const DesktopMenuItem = ({ option, active, setMenuOption }) => {
  return (
    <Menu.Item
      as={Link}
      to={option.path}
      name={option.name}
      active={active.path === option.path}
      onClick={() => setMenuOption(option)}
    />
  );
};

const mapStateToProps = state => ({
  active: state.user.activeOption || {}
});

export default connect(
  mapStateToProps,
  { setMenuOption }
)(DesktopMenuItem);
