import React from "react";
import { Sticky, Responsive } from "semantic-ui-react";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Menu = () => {
  return (
    <Sticky
      style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)", marginBottom: "1em" }}
    >
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <DesktopMenu />
      </Responsive>
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <MobileMenu />
      </Responsive>
    </Sticky>
  );
};

export default Menu;
