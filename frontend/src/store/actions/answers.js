import { ANSWERS_RECEIVED, RESET_ANSWERS } from "./types";
import { endpoints } from "../../services/http";
import { http } from "../../services/http";
import { handleFetchingError } from "./general";

export const answersReceived = answers => ({
  type: ANSWERS_RECEIVED,
  payload: answers
});

export const resetAnswers = () => ({
  type: RESET_ANSWERS
});

export const getAnswers = teamId => async dispatch => {
  try {
    const {data} = await http.get(`${endpoints.teams}/${teamId}/answers`);
    dispatch(answersReceived(data));
  } catch (error) {
    dispatch(handleFetchingError(error));
  }
};

export const removeAnswersFromDate = (teamId, date) => async dispatch => {
  try {
    await http.delete(`${endpoints.teams}/${teamId}/answers?date=${date}`);
    dispatch(getAnswers(teamId));
  } catch (error) {
    dispatch(handleFetchingError(error));
  }
};
