import {
  GET_HOME_TOPICS,
  ADD_TOPICS_PAGE,
  GET_TOPIC_DETAIL,
} from '../actions/topic.type';


const initialState = {
  page:1,
  topics:[],
  topic:null,
  currentTopicDetailId:null,
  isPendingTopics: false,
  isPendingTopic: false,
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
      topics:[...action.payload,...state.topics],
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
    case GET_TOPIC_DETAIL.REQUEST:
    return {
      ...state,
      currentTopicDetailId:action.id
    }
    case GET_TOPIC_DETAIL.SUCCESS:
    return {
      ...state,
      topic:action.payload,
    }
    case GET_TOPIC_DETAIL.ERROR:
    return {
      ...state,
      error:action.error,
    }
    default:
    return state;
  }
}
