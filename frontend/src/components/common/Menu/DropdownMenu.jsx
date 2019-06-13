import React from "react";
import { Dropdown } from "semantic-ui-react";
import DropdownMenuItem from "./DropdownMenuItem";

const DropdownMenu = ({ options }) => {
  return (
    <Dropdown item text="More">
      <Dropdown.Menu>
        {options.map(option => (
          <DropdownMenuItem key={option.name} option={option} />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
