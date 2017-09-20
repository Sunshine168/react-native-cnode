import { topicReducer } from './topic';
import { combineReducers } from 'redux';
import { userReducer } from './user'
export const rootReducer = combineReducers({
  topic: topicReducer,
  user: userReducer,
})
