import React from "react";
import { Card, Grid } from "semantic-ui-react";
import colors from "../../../styles/colors";
import SectionIcon from "../../common/SectionIcon/";

const SectionContent = ({ tribe, showMinus, active }) => {
  return (
    <Card.Content>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={13} floated="left">
            {showMinus ? (
              <SectionIcon
                className="fa fa-minus-square-o"
                color={colors.red}
                onClick={() => {}}
              />
            ) : null}
            <span>{tribe}</span>
          </Grid.Column>
          <Grid.Column width={3} floated="right" textAlign="center">
            {active ? (
              <SectionIcon className="fa fa-chevron-right" onClick={() => {}} />
            ) : (
              <SectionIcon className="fa fa-angle-right" onClick={() => {}} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  );
};

export default SectionContent;
