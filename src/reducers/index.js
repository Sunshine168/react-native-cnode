import { topicReducer } from './topic';
import { combineReducers } from 'redux';
import { userReducer } from './user'
import { navReducer }  from './nav'
export const rootReducer = combineReducers({
  topic: topicReducer,
  user: userReducer,
  nav: navReducer
})
