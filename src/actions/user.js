import { LOGIN_IN, LOGIN_OUT, GET_PERSONAL_USERINFO } from './user.type/';


export const loginIn = (accesstoken)=>({
  type:LOGIN_IN.REQUEST,
  accesstoken:accesstoken
})


export const getPersonalUserInfo = ()=>({
  type: GET_PERSONAL_USERINFO.REQUEST
})

export const loginOut = ()=>({
  type:LOGIN_OUT.REQUEST,
})
