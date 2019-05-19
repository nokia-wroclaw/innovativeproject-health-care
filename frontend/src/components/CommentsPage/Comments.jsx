import React from 'react';
import {Card, Label} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {setTeamAnswers} from "../../store/actions/results";

const ansToColor = (answer) => {
  switch (answer) {
    case 0:
      return 'red';
    case 1:
      return 'yellow';
    case 2:
      return 'green';
  }
};

const Comments = ({teamId, answers, ...props }) => {

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
              <Label color={ansToColor(item.answer)} size={'small'}>
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
  { setTeamAnswers }
)(Comments);
