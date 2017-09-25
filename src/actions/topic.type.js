import { createActionSet } from '../utils/action-helpers';


export const GET_HOME_TOPICS = createActionSet('GET_HOME_TOPICS');
export const ADD_HOME_TOPICS = createActionSet('ADD_HOME_TOPICS');
export const GET_TOPIC_DETAIL = createActionSet('GET_TOPIC_DETAIL');
export const POST_TOPIC  =  createActionSet('POST_TOPIC');
export const COLLECT_TOPIC = createActionSet('COLLECT_TOPIC');
export const CANCEL_COLLECT_TOPIC = createActionSet('CANCEL_COLLECT_TOPIC');
export const POST_REPLY = createActionSet('POST_REPLY');