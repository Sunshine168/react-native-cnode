import { LOGIN_IN, GET_PERSONAL_USERINFO } from '../actions/user.type'


const initialState = {
  accesstoken:"",
  userInfo:{

  },
  isPendingLogin:false,
  error:"",
  isPendingGetPersonalDetail:false,
  personalUserInfoDetail:{

  }
}

export const userReducer = ( state =initialState,action={})=>{
  switch(action.type){
    case LOGIN_IN.REQUEST:{
      return {
        ...state,
        accesstoken:action.accesstoken,
      }
    }
    case LOGIN_IN.PENDING:
    return {
      ...state,
      isPendingLogin:true,
    }
    case LOGIN_IN.SUCCESS:{
      return {
        ...state,
        userInfo:action.payload,
        isPendingLogin:false,
        error:""
      }
    }
      case LOGIN_IN.ERROR:{
        return {
          ...state,
          error:action.error,
          isPendingLogin:false
        }
    }
     case GET_PERSONAL_USERINFO.PENDING:{
       return {
           ...state,
           isPendingGetPersonalDetail:true,
       }
     }
     case GET_PERSONAL_USERINFO.SUCCESS:{
       return {
         ...state,
         isPendingGetPersonalDetail:false,
         personalUserInfoDetail:action.payload.data
       }
     }
    default:
    return state
  }
}
