import React from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import * as colors from "../../../styles/colors";
import DropdownMenu from "./DropdownMenu";

const MobileMenu = ({ menu }) => {
  return (
    <Menu inverted pointing secondary color={colors.menu} style={{ margin: 0 }}>
      <DropdownMenu options={menu} />
    </Menu>
  );
};

const mapStateToProps = state => ({
  menu: state.user.menu
});

export default connect(mapStateToProps)(MobileMenu);
