import {
    REPLY_TOPIC 
} from '../actions/reply.type';


const initialState = {
    isPendingReply:false,
    isReplySuccess:false,
}

export default replyReducer = (state = initialState, action) => {
  switch (action.type) {
  case REPLY_TOPIC.PENDING:
    return { 
        ...state,
        isPendingReply:true,
        isReplySuccess:false,
    }
    case REPLY_TOPIC.SUCCESS:
    return { 
        ...state,
        isPendingReply:false,
        isReplySuccess:true,
    }
    case REPLY_TOPIC.ERROR:
    return { 
        ...state,
        isPendingReply:false,
        isReplySuccess:false,
    }
  default:
    return state
  }
}




