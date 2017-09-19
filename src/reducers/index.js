import { topicReducer } from './topic';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  topic: topicReducer,
})
