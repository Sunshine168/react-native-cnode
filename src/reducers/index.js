import { topicReducer } from './topic';
import { combineReducers } from 'redux';
import { userReducer } from './user'
import { tabNavReducer }  from './nav'
import { messageReducer } from './message'
export const rootReducer = combineReducers({
  topic: topicReducer,
  user: userReducer,
  tabNav: tabNavReducer,
  message: messageReducer,
})
