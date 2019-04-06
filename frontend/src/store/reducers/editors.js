import { SET_EDITORS, ADD_EDITOR, DELETE_EDITOR } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_EDITORS:
      return action.payload;

    case ADD_EDITOR:
      const editors = [...state];
      if (!editors.find(editor => editor.id === action.payload.id))
        editors.push(action.payload);
      return editors;

    case DELETE_EDITOR:
      const editors_ = [...state].filter(
        editor => editor.id !== action.payload.id
      );
      return editors_;

    default:
      return state;
  }
}
