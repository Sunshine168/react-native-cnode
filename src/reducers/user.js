import { LOGIN_IN } from '../actions/user.type'


const initialState = {
  accessToken:"",
  userInfo:{

  },
  isLogining:false,
  error:""
}

export const userReducer = ( state =initialState,action={})=>{
  switch(action.type){
    case LOGIN_IN.PENDING:
    return {
      ...state,
      isLogining:true,
    }
    case LOGIN_IN.SUCCESS:{
      return {
        ...state,
        userInfo:action.payload,
        isLogining:false
      }
    }
      case LOGIN_IN.ERROR:{
        return {
          ...state,
          error:action.error,
          isLogining:false
        }
    }
    default:
    return state
  }
}
