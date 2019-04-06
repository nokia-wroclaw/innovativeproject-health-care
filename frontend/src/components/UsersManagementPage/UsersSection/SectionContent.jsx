import React from "react";
import { Card } from "semantic-ui-react";
import colors from "../../../styles/colors";
import SectionIcon from "../../common/SectionIcon";

const SectionContent = ({ text, onDelete, showMinus }) => {
  return (
    <Card.Content>
      {showMinus ? (
        <SectionIcon
          className="fa fa-minus-square-o"
          color={colors.red}
          onClick={onDelete}
        />
      ) : null}
      <span>{text}</span>
    </Card.Content>
  );
};

export default SectionContent;
