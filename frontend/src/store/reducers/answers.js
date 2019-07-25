import {createSelector} from 'reselect';
import {get, groupBy} from 'lodash/fp';

import { ANSWERS_RECEIVED, RESET_ANSWERS } from "../actions/types";

export default (state = [], {type, payload}) => {
  switch (type) {
    case ANSWERS_RECEIVED:
      return payload;
    case RESET_ANSWERS:
      return [];
    default:
      return state;
  }
};

export const getAnswersByDate = createSelector(
  get('answers'),
  groupBy('date')
);
