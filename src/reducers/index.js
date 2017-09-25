import { topicReducer } from './topic';
import { combineReducers } from 'redux';
import { userReducer } from './user';
import { tabNavReducer }  from './nav';
import { messageReducer } from './message';
import { globalReducer } from './globalNav';
import  replyReducer  from './reply';
export const rootReducer = combineReducers({
  topic: topicReducer,
  user: userReducer,
  tabNav: tabNavReducer,
  message: messageReducer,
  globalNav:globalReducer,
  reply:replyReducer,
})
