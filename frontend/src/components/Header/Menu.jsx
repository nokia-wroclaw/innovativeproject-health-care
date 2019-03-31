import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Menu as SemanticMenu,
  Sticky,
  Dropdown,
  Responsive,
  Container,
  Accordion
} from "semantic-ui-react";
import { setMenuOption } from "../../store/actions";
import colors from "../../styles/colors";

const Menu = ({ menu, active, setMenuOption }) => {
  return (
    <Sticky>
      <SemanticMenu
        inverted
        pointing
        secondary
        color={colors.menu}
        style={{ margin: 0 }}
      >
        {menu.slice(0, 4).map(option => (
          <SemanticMenu.Item
            as={Link}
            to={option.path}
            key={option.name}
            name={option.name}
            active={active === option.name}
            onClick={() => setMenuOption(option.name)}
          />
        ))}

        {menu.length > 4 ? (
          <Dropdown item text="More">
            <Dropdown.Menu>
              {menu.slice(4).map(option => (
                <Dropdown.Item
                  as={Link}
                  to={option.path}
                  key={option.name}
                  active={active === option.name}
                  onClick={() => setMenuOption(option.name)}
                >
                  {option.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
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
