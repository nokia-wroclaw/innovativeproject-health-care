import React from "react";
import { Card, Label, Item } from "semantic-ui-react";
import { connect } from "react-redux";
import { red, yellow, green, grey } from "../../styles/colors";

import styles from './Comments.module.scss';
import { ActionItems } from "./ActionItems";

const valueToColor = value => {
  switch (value) {
    case 0:
      return red;
    case 1:
      return yellow;
    case 2:
      return green;
    default:
      return grey;
  }
};

const Comments = ({ answers }) => {
  let items = [];
  if (answers.length > 0) {
    items = answers.filter(answer => answer.comment != null);
    items.sort((a, b) => (a.order < b.order ? -1 : 1));
  }

  return items.length > 0 ? (
    <Item.Group divided>
      {items.map((item, i) => (
        <Item key={i}>
          <Item.Image className={styles.image}>
              <Label className={styles.answer} size='massive' circular color={valueToColor(item.answer)}>
                {item.answer}
              </Label>
          </Item.Image>
          <Item.Content>
            <Item.Header>{item.question}</Item.Header>
            <Card.Description>{item.comment}</Card.Description>
            <Item.Extra>
              <ActionItems answerId={item.id} teamId={item.team_id} actionItems={item.actions} />
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  ) : (
    <p>No comments to show.</p>
  );
};

const mapStateToProps = state => ({
  answers: state.results.team
});

export default connect(mapStateToProps)(Comments);
