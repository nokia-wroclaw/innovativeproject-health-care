import React from "react";
import { connect } from "react-redux";
import { Menu, Container } from "semantic-ui-react";
import * as colors from "../../../styles/colors";
import DropdownMenu from "./DropdownMenu";
import DesktopMenuItem from "./DesktopMenuItem";

const menuSplitIndex = 4;

const DesktopMenu = ({ menu }) => {
  return (
    <Menu inverted pointing secondary color={colors.menu} style={{ margin: 0 }}>
      <Container>
        {menu.slice(0, menuSplitIndex).map(option => (
          <DesktopMenuItem key={option.name} option={option} />
        ))}
        {menu.length > menuSplitIndex ? (
          <DropdownMenu options={menu.slice(menuSplitIndex)} />
        ) : null}
      </Container>
    </Menu>
  );
};

const mapStateToProps = state => ({
  menu: state.user.menu
});

export default connect(mapStateToProps)(DesktopMenu);
