import { SAMPLE_TYPE } from "./../actions/types";

const initialState = {
  sample_item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAMPLE_TYPE:
      return {
        ...state,
        sample_item: action.payload
      };

    default:
      return state;
  }
}
