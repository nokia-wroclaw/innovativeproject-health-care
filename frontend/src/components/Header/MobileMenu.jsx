import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Sticky, Dropdown, Segment, Container } from "semantic-ui-react";
import { setMenuOption } from "../../store/actions";
import colors from "../../styles/colors";

const MobileMenu = ({ menu, active, setMenuOption }) => {
  return (
    <Sticky>
      <Segment
        inverted
        vertical
        color={colors.menu}
        style={{ padding: "0 10px" }}
      >
        <Container>
          <Menu
            vertical
            inverted
            color={colors.menu}
            style={{ padding: 10, fontWeight: "bold" }}
          >
            <Dropdown text="Menu">
              <Dropdown.Menu>
                {menu.map(option => (
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
          </Menu>
        </Container>
      </Segment>
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
)(MobileMenu);