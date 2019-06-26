import React from "react";
import { Dropdown, Message } from "semantic-ui-react";

const PeriodSelect = ({ value, onChange }) => {
  const options = [
    {
      text: "a month",
      value: 1
    },
    {
      text: "in 2 months",
      value: 2
    },
    {
      text: "in 3 months",
      value: 3
    },
    {
      text: "in 4 months",
      value: 4
    },
    {
      text: "in 5 months",
      value: 5
    },
    {
      text: "in 6 months",
      value: 6
    }
  ];
  return (
    <Message>
      <span>Ask teams to fill this survey once </span>
      <Dropdown
        placeholder="Select tribe"
        options={options.map(option => ({
          key: option.value,
          text: option.text,
          value: option.value
        }))}
        selection
        onChange={onChange}
        value={value}
      />
    </Message>
  );
};

export default PeriodSelect;
