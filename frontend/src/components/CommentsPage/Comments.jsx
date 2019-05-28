import React from 'react';
import {Card, Label} from 'semantic-ui-react';
import {connect} from 'react-redux';

const RED = "red";
const YELLOW = "yellow";
const GREEN = "green";
const GREY = "grey";

const valueToColor = value => {
  switch (value) {
    case 0:
      return RED;
    case 1:
      return YELLOW;
    case 2:
      return GREEN;
    default:
      return GREY;
  }
};

const Comments = ({answers}) => {

  let items = [];
  if (answers.length > 0) {
    items = answers.filter(answer => answer.comment != null);
    items.sort((a, b) => (a.order < b.order ? -1 : 1));
  }

  return (items.length > 0) ? (
    <Card.Group>
      {items.map((item, i) => (
        <Card key={i}>
          <Card.Content>
            <Card.Header>
              {item.question}
            </Card.Header>
            <Card.Meta>
              <Label color={valueToColor(item.answer)} size={'small'}>
                Answer: {item.answer}
              </Label>
            </Card.Meta>
            <Card.Description>
              {item.comment}
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  ) : (
    <p>No comments to show.</p>
  );
};

const mapStateToProps = state => ({
  answers: state.results.team
});

export default connect(
  mapStateToProps,
)(Comments);
