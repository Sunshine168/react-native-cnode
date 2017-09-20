import { LOGIN_IN, LOGIN_OUT } from './user.type/';


export const loginIn = (accesstoken)=>({
  type:LOGIN_IN.REQUEST,
  accesstoken:accesstoken
})
