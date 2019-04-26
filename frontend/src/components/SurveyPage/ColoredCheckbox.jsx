import React from "react";
import { connect } from "react-redux";
import { Popup } from "semantic-ui-react";
import { setAnswer } from "../../store/actions";
import "./checkbox.css";

const ColoredCheckbox = ({
  color,
  value,
  questionId,
  answer,
  hintText,
  setAnswer
}) => {
  return (
    <Popup
      trigger={
        <div
          className="checkbox-container "
          onClick={() => setAnswer(questionId, value)}
        >
          <input
            type="checkbox"
            className="checkbox"
            checked={value === answer}
            onChange={() => {}}
          />
          <span className={`checkmark ${color}-outline`} />
        </div>
      }
      content={hintText}
      position="bottom center"
    />
  );
};

export default connect(
  null,
  { setAnswer }
)(ColoredCheckbox);
