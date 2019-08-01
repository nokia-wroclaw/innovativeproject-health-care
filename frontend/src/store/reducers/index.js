import { combineReducers } from 'redux';
import userReducer from './user';
import currentSurveyReducer from './currentSurvey';
import editorsReducer from './editors';
import tribesReducer from './tribes&teams';
import generalReducer from './general';
import surveysReducer from './surveys';
import resultsReducer from './results'
import answersReducer from './answers';

export default combineReducers({
  user: userReducer,
  editors: editorsReducer,
  tribes: tribesReducer,
  currentSurvey: currentSurveyReducer,
  general: generalReducer,
  surveys: surveysReducer,
  results: resultsReducer,
  answers: answersReducer
});
