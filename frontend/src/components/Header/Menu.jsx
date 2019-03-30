import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu as SemanticMenu, Sticky } from "semantic-ui-react";
import { setMenuOption } from "../../store/actions";
import colors from "../../styles/colors";

const Menu = ({ menu, active, setMenuOption }) => {
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
        {menu.map(option => (
          <SemanticMenu.Item
            as={Link}
            to={option.path}
            key={option.name}
            name={option.name}
            active={active === option.name}
            onClick={() => setMenuOption(option.name)}
          />
        ))}
      </SemanticMenu>
    </Sticky>
  );
};

const mapStateToProps = state => ({
  menu: state.user.menu,
  active: state.user.activeOption
});

export default connect(
  mapStateToProps,
  { setMenuOption }
)(Menu);
