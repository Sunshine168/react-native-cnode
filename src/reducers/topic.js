import {
  GET_HOME_TOPICS,
  ADD_TOPICS_PAGE
} from '../actions/topic.type';


const initialState = {
  page:1,
  topics:[],
  isPendingTopics: false,
  error:'',
}

export const topicReducer = ( state = initialState, action={}) => {
  switch(action.type) {
    case GET_HOME_TOPICS.PENDING:
    return {
      ...state,
      isPendingTopics:true,
    };
    case GET_HOME_TOPICS.SUCCESS:
    return {
      ...state,
      topics:[...state.topics,...action.payload],
      isPendingTopics:false,
      page:state.page + 1,
    };
    case GET_HOME_TOPICS.ERROR:
    return {
      ...state,
      isPendingTopics:false,
      error:action.error,
    };
    case ADD_TOPICS_PAGE:
    return {
      ...state,
      page:state.page + 1,
    }
    default:
    return state;
  }
}
