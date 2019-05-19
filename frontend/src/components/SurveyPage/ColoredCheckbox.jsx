import React from 'react';
import { connect } from 'react-redux';
import { Popup } from 'semantic-ui-react';
import { setAnswer } from '../../store/actions/currentSurvey';
import './checkbox.css';

const ColoredCheckbox = ({ color, value, question, hintText, ...props }) => {
  return (
    <Popup
      trigger={
        <div
          className='checkbox-container '
          onClick={() => props.setAnswer(question.id, value)}
        >
          <input
            type='checkbox'
            className='checkbox'
            checked={value === question.answer}
            onChange={() => {}}
          />
          <span className={`checkmark ${color}-outline`} />
        </div>
      }
      content={hintText}
      position='bottom center'
    />
  );
};

const mapStateToProps = state => ({
  survey: state.currentSurvey
});

export default connect(
  mapStateToProps,
  { setAnswer }
)(ColoredCheckbox);
