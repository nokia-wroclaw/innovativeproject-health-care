import React from 'react';
import { Dropdown, Container } from 'semantic-ui-react';

const PeriodSelect = ({ value, onChange }) => {
  const options = [
    {
      text: 'a mounth',
      value: 1
    },
    {
      text: 'in 2 mounths',
      value: 2
    },
    {
      text: 'in 3 mounths',
      value: 3
    },
    {
      text: 'in 4 mounths',
      value: 4
    },
    {
      text: 'in 5 mounths',
      value: 5
    },
    {
      text: 'in 6 mounths',
      value: 6
    }
  ];
  return (
    <Container>
      <span>Ask teams to fill this survey once </span>
      <Dropdown
        placeholder='Select tribe'
        options={options.map(option => ({
          key: option.value,
          text: option.text,
          value: option.value
        }))}
        selection
        onChange={onChange}
        value={value}
      />
    </Container>
  );
};

export default PeriodSelect;
