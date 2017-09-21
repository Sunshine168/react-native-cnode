import { GET_MESSAGES } from '../actions/message.type';
const initialState = {
    has_read_messages:[],
    hasnot_read_messages: [],
    isPendingMessages:false,
}

export const messageReducer =  (state = initialState, action) => {
  switch (action.type) {
  case GET_MESSAGES.PENDING:
    return { 
        ...state,
        isPendingMessages:true
     }
     case GET_MESSAGES.SUCCESS:
     return { 
         ...state,
         isPendingMessages:false,
         has_read_messages:action.payload.data.has_read_messages,
         hasnot_read_messages:action.payload.data.hasnot_read_messages,
      }
      case GET_MESSAGES.ERROR:
      return {
          ...state,
          isPendingMessages:false,
          error:action.error
      }
  default:
    return state
  }
}
